import { BukpotRepository } from '../../data-access/repositories/bukpot.repository';
import { SalarySlipRepository } from '../../data-access/repositories/salary_slip.repository';
import { PTKPRepository } from '../../data-access/repositories/ptkp.repository';
import { Bukpot, BukpotAttributes } from '../../infrastructure/models/bukpot.model';
import db from '../../infrastructure/models';
import { PKPService } from './pkp.service';
import { Model } from 'sequelize';
import { Request } from 'express';
import { BaseService } from '../common/base.service';
import { CountBukpotInputVM, CountBukpotOutputVM, CountNettoInputVM, CountNettoOutputVM } from '../../helpers/view-models/bukpot.vm';

export class BukpotService extends BaseService<Bukpot> {
    private bukpotRepository: BukpotRepository;
    private salarySlipRepository: SalarySlipRepository;
    private ptkpRepository: PTKPRepository;
    private pkpService: PKPService;

    constructor() {
        const bukpotRepository = new BukpotRepository();
        const salarySlipRepository = new SalarySlipRepository();
        const ptkpRepository = new PTKPRepository();
        const pkpService = new PKPService();

        super(bukpotRepository);

        this.bukpotRepository = bukpotRepository;
        this.salarySlipRepository = salarySlipRepository;
        this.ptkpRepository = ptkpRepository;
        this.pkpService = pkpService
    }

    async countPPhFromNetto(req: Request, data: CountNettoInputVM): Promise<CountNettoOutputVM> {
        const penghasilan_netto = data.nettoInput.penghasilan_netto;
        const ptkp_id = data.nettoInput.ptkp_id;

        const ptkpFetch = await this.ptkpRepository.findByID(req, ptkp_id);

        if (ptkpFetch === null) throw new Error('PTKP not found');

        const ptkp = ptkpFetch?.dataValues.amount;
        const pkp = penghasilan_netto - (ptkp ?? 0);

        let yearly_pph21 = 0;

        if (pkp > 0) {
            const pkpFetch = await this.pkpService.getByNominal(req, pkp);
            const pkp_percentage = pkpFetch?.dataValues.tariff_percentage;

            yearly_pph21 = pkp * (pkp_percentage ?? 0) / 100;
            yearly_pph21 = parseFloat(yearly_pph21.toFixed(2));
        }

        const returnData = new CountNettoOutputVM({
            ptkp,
            pkp: Number.isNaN(pkp) ? 0 : pkp,
            yearly_pph21
        });

        return returnData;
    }

    async countBukpot(req: Request, data: CountBukpotInputVM): Promise<CountBukpotOutputVM> {
        try {
            const employee_id = data.bukpotInput.employee_id;
            const ptkp_id = data.bukpotInput.ptkp_id;
            const year = data.bukpotInput.year;

            // get all salary slip of the employee in that year
            const allSalarySlips = await this.salarySlipRepository.where(req, { employee_id, year });
            
            const month_name = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            let is_last_month = false;

            // penghasilan bruto
            let gaji = 0;
            let tunjangan_pph = 0;
            let tunjangan_lain_uang_lembur = 0;
            let honorarium = 0;
            let asuransi_diberi_pekerja = 0;
            let natura = 0;
            let bonus = 0;
            
            // pengurangan
            let biaya_jabatan = 0;
            let iuran_pensiun_asuransi_sendiri = 0;
            let amal_amount = 0;

            // pajak sudah dibayar
            let paid_pph21 = 0;

            allSalarySlips.map((item) => {
                let salarySlip = item.dataValues;

                salarySlip.gaji_pokok = salarySlip.gaji_pokok ?? 0;
                salarySlip.tunjangan_jabatan = salarySlip.tunjangan_jabatan ?? 0;
                salarySlip.tunjangan_keluarga = salarySlip.tunjangan_keluarga ?? 0;
                salarySlip.gaji_lembur = salarySlip.gaji_lembur ?? 0;
                salarySlip.benefit_bpjs_kesehatan = salarySlip.benefit_bpjs_kesehatan ?? 0;
                salarySlip.benefit_bpjs_tk_jht = salarySlip.benefit_bpjs_tk_jht ?? 0;
                salarySlip.benefit_bpjs_tk_jkk = salarySlip.benefit_bpjs_tk_jkk ?? 0;
                salarySlip.benefit_bpjs_tk_jkm = salarySlip.benefit_bpjs_tk_jkm ?? 0;
                salarySlip.benefit_bpjs_tk_jp = salarySlip.benefit_bpjs_tk_jp ?? 0;
                salarySlip.deduction_asuransi_pribadi = salarySlip.deduction_asuransi_pribadi ?? 0;
                salarySlip.deduction_bpjs_kesehatan = salarySlip.deduction_bpjs_kesehatan ?? 0;
                salarySlip.deduction_bpjs_tk_jht = salarySlip.deduction_bpjs_tk_jht ?? 0;
                salarySlip.deduction_bpjs_tk_jp = salarySlip.deduction_bpjs_tk_jp ?? 0;
                salarySlip.deduction_pph21 = salarySlip.deduction_pph21 ?? 0;
                salarySlip.deduction_amal = salarySlip.deduction_amal ?? 0;
                salarySlip.penalti = salarySlip.penalti ?? 0;

                if (salarySlip.status !== 'Not Written In Journal') {
                    gaji += salarySlip.gaji_pokok - salarySlip.penalti;
                    tunjangan_pph += salarySlip.tunjangan_jabatan + salarySlip.tunjangan_keluarga;
                    tunjangan_lain_uang_lembur += salarySlip.gaji_lembur;
                    asuransi_diberi_pekerja += salarySlip.benefit_bpjs_kesehatan + salarySlip.benefit_bpjs_tk_jht + salarySlip.benefit_bpjs_tk_jkk + salarySlip.benefit_bpjs_tk_jkm + salarySlip.benefit_bpjs_tk_jp;
                    iuran_pensiun_asuransi_sendiri += salarySlip.deduction_asuransi_pribadi + salarySlip.deduction_bpjs_kesehatan + salarySlip.deduction_bpjs_tk_jht + salarySlip.deduction_bpjs_tk_jp;
                    paid_pph21 += salarySlip.deduction_pph21;
                    amal_amount += salarySlip.deduction_amal;

                    if (salarySlip.month === "Desember") {
                        is_last_month = true;
                    };

                    const allowances = salarySlip?.Allowances;

                    if (allowances && allowances?.length !== 0) {
                        allowances.map((item) => {
                            if (item.AllowanceName?.type === 'Tunjangan PPh') {
                                tunjangan_pph += item.amount;
                            } else if (item.AllowanceName?.type === 'Natura') {
                                natura += item.amount;
                            } else if (item.AllowanceName?.type === 'Honarium') {
                                honorarium += item.amount;
                            } else if (item.AllowanceName?.type === 'Bonus') {
                                bonus += item.amount;
                            }
                        });
                    }
                }
            });

            const penghasilan_bruto = gaji + tunjangan_pph + tunjangan_lain_uang_lembur + honorarium + natura + bonus + asuransi_diberi_pekerja; 
            
            biaya_jabatan = (5 / 100 * penghasilan_bruto) > 6000000 ? 6000000 : (5 / 100 * penghasilan_bruto);
            biaya_jabatan = parseFloat(biaya_jabatan.toFixed(2));
            const pengurangan = biaya_jabatan + iuran_pensiun_asuransi_sendiri + amal_amount;

            const penghasilan_netto = penghasilan_bruto - pengurangan;

            const countArgs = new CountNettoInputVM({
                penghasilan_netto,
                ptkp_id
            })

            let count = await this.countPPhFromNetto(req, countArgs);
            const ptkp = count.nettoOutput.ptkp;
            const pkp = count.nettoOutput.pkp > 0 ? count.nettoOutput.pkp : 0;
            const yearly_pph21 = count.nettoOutput.yearly_pph21;
            let last_month_pph21 = yearly_pph21 - paid_pph21 > 0 ? yearly_pph21 - paid_pph21 : 0;
            last_month_pph21 = parseFloat(last_month_pph21.toFixed(2));

            const res = new CountBukpotOutputVM({
                gaji,
                tunjangan_pph,
                tunjangan_lain_uang_lembur,
                honorarium,
                asuransi_diberi_pekerja,
                natura,
                bonus,
                biaya_jabatan,
                iuran_pensiun_asuransi_sendiri,
                penghasilan_netto,
                ptkp,
                pkp,
                amal_amount,
                yearly_pph21,
                last_month_pph21,
                paid_pph21,
                is_last_month,
            });

            return res;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error occurred in BukpotService - count: ' + error.message);
            }
            throw error;
        }
    }

    async getBukpotForIndex(req: Request): Promise<Model<BukpotAttributes>[]> {
        try {
            interface Recapped {
                [key: string]: { // tahun
                    [key: string]: // employee
                        {
                            ptkp_id: number | null,
                            is_bukpot_exist: boolean,
                        };
                }
            }

            const recapped: Recapped = {};
            let refresh = false;

            let bukpots = await this.bukpotRepository.findAll(req, [{
                model: db.Employee
            }]);
            const slips = await this.salarySlipRepository.where(req, {
                '$Employee.Position.type$': 'White'
            }, [
                {
                    model: db.Employee,
                    attributes: ['position_id', 'fullname', 'ptkp_id'],
                    include: [
                        {
                            model: db.Position,
                            attributes: ['type']
                        }
                    ]
                }
            ]);

            slips.map((item) => {
                if (item.dataValues.year) {
                    const year = item.dataValues.year;
                
                    if (!recapped[year]) {
                        recapped[year] = {};
                    }

                    if (!recapped[year][item.dataValues.employee_id.toString()]) {
                        recapped[year][item.dataValues.employee_id.toString()] = {
                            ptkp_id: item.dataValues.Employee?.ptkp_id || null,
                            is_bukpot_exist: false,
                        }
                    }
                }
            });


            bukpots.map((item) => {
                const year = item.dataValues.year;
                const employee_id = item.dataValues.employee_id.toString();

                if (!recapped[year]) {
                    recapped[year] = {};
                }

                recapped[year][employee_id] = {
                    ptkp_id: null,
                    is_bukpot_exist: true,
                }
                
            });

            // console.log(recapped);

            for (const year in recapped) {
                for (const employee_id in recapped[year]){
                    if (!recapped[year][employee_id].is_bukpot_exist) {
                        // push empty salary slip
                        refresh = true;

                        const data = {
                            employee_id: parseInt(employee_id),
                            ptkp_id: recapped[year][employee_id].ptkp_id ?? 0,
                            year: parseInt(year),
                            status: 'Not Verified'
                        };

                        // console.log(data);

                        await this.bukpotRepository.create(req, data);
                    }
                }
            }

            if (refresh) bukpots =  await this.bukpotRepository.findAll(req);

            return bukpots;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in Salarybukpotservice - findAllSalarybukpots: ' + error.message);
            }
            throw error;
        }
    }
}
