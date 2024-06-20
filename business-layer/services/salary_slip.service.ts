import { SalarySlipRepository } from '../../data-access/repositories/salary_slip.repository';
import { SalaryPercentageRepository } from '../../data-access/repositories/salary_percentage.repository';
import { EmployeeService } from './employee.service';
import { AllowanceService } from './allowance.service';
import { DayOffService } from './day_off.service';
import { PresenceWhiteService } from './presence_white.service';
import { PresenceBlueService } from './presence_blue.service';
import { TerPPHService } from './ter_pph.service';
import { SalarySlip, SalarySlipAttributes } from '../../infrastructure/models/salary_slip.model';
import { BukpotService } from './bukpot.service';
import { ConfigurationService } from './configuration.service';
import { OvertimeService } from './overtime.service';
import { Model } from 'sequelize';
import { OvertimeAttributes } from '../../infrastructure/models/overtime.model';
import { generateSalarySlipId } from '../../helpers/utils/generateId';
import { PositionAttributes } from '../../infrastructure/models/position.model';
import { BaseService } from '../common/base.service';
import { Request } from 'express';
import db from '../../infrastructure/models';
import { CountHourSalaryBlueOutputVM, CountHourSalaryWhiteOuputVM, CountSalaryBlueInputVM, CountSalaryBlueOutputVM, CountSalaryBlueVM, CountSalarySlipInputVM, CountSalarySlipOutputVM, CountSalarySlipVM, CountSalaryWhiteOutputVM } from '../../helpers/view-models/salary_slip.vm';
import { GetTerPPhByIncomeInputVM } from '../../helpers/view-models/ter_pph.vm';
import { CountBukpotInputVM } from '../../helpers/view-models/bukpot.vm';
import { CountPresenceWhiteInputVM } from '../../helpers/view-models/presence_white.vm';
import { CountHourPresenceBlueByStartLastDateInputVM } from '../../helpers/view-models/presence_blue.vm';

export class SalarySlipService extends BaseService<SalarySlip> {
    private salarySlipRepository: SalarySlipRepository;
    private salaryPercentageRepository: SalaryPercentageRepository;
    private presenceWhiteService: PresenceWhiteService;
    private employeeService: EmployeeService;
    private terPPHService: TerPPHService;
    private allowanceService: AllowanceService;
    private dayOffService: DayOffService;
    private configurationService: ConfigurationService;
    private overtimeService: OvertimeService;
    private bukpotService: BukpotService;
    private presenceBlueService: PresenceBlueService;

    constructor() {
        const salarySlipRepository = new SalarySlipRepository();
        const salaryPercentageRepository = new SalaryPercentageRepository();
        const presenceWhiteService = new PresenceWhiteService();
        const employeeService = new EmployeeService();
        const terPPHService = new TerPPHService();
        const allowanceService = new AllowanceService();
        const dayOffService = new DayOffService();
        const configurationService = new ConfigurationService();
        const overtimeService = new OvertimeService();
        const bukpotService = new BukpotService();
        const presenceBlueService = new PresenceBlueService();

        super(salarySlipRepository);

        this.salarySlipRepository = salarySlipRepository;
        this.salaryPercentageRepository = salaryPercentageRepository;
        this.presenceWhiteService = presenceWhiteService;
        this.employeeService = employeeService;
        this.terPPHService = terPPHService;
        this.allowanceService = allowanceService;
        this.dayOffService = dayOffService;
        this.configurationService = configurationService;
        this.overtimeService = overtimeService;
        this.bukpotService = bukpotService;
        this.presenceBlueService = presenceBlueService;
    }

    async getWhiteSalarySlipForIndex(req: Request): Promise<Model<SalarySlipAttributes>[]> {
        try {
            interface Recapped {
                [key: string]: { // tahun
                    [key: string]: { // bulan 
                        [key: string]:  // employee id
                            boolean
                    }
                };
            }

            const recapped: Recapped = {};
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            let refresh = false;

            let slips = await this.salarySlipRepository.where(req, {
                '$Employee.Position.type$': 'White'
            }, [
                {
                    model: db.Employee,
                    attributes: ['position_id', 'fullname'],
                    include: [
                        {
                            model: db.Position,
                            attributes: ['type']
                        }
                    ]
                },
                {
                    model: db.Allowance,
                    attributes: ['amount']
                }
            ]);

            const presences = await this.presenceWhiteService.findAll(req);

            presences.map((item) => {
                if (item.dataValues.date) {
                    const date = new Date(item.dataValues.date);
                    const year = date.getFullYear().toString();
                    const month = date.getMonth().toString();

                    if (!recapped[year]) {
                        recapped[year] = {};
                    }
                    
                    if (!recapped[year][month]) {
                        recapped[year][month] = {};
                    }

                    recapped[year][month][item.dataValues.employee_id.toString()] = false;
                }
            });


            slips.map((item) => {
                const year = item.dataValues.year.toString();
                const month = months.indexOf(item.dataValues.month).toString();
                const employee_id = item.dataValues.employee_id;

                if (!recapped[year]) {
                    recapped[year] = {};
                }
                
                if (!recapped[year][month]) {
                    recapped[year][month] = {};
                }

                recapped[year][month][employee_id] = true;
            });

            for (const year in recapped) {
                for (const month in recapped[year]) {
                    for (const employeeId in recapped[year][month]) {
                        if (!recapped[year][month][employeeId]) {
                            // push empty salary slip
                            refresh = true;

                            await this.salarySlipRepository.create(req, {
                                // pkid: generateSalarySlipId(),
                                employee_id: parseInt(employeeId),
                                year: parseInt(year),
                                month: months[parseInt(month)],
                                start_date: new Date(year.toString() + "-" + ((parseInt(month) + 1) > 9 ? "" : "0") + (parseInt(month) + 1).toString() + "-01"),
                                last_date: new Date(parseInt(year), parseInt(month) + 1, 1),
                                status: 'Not Written In Journal'
                            })
                        }
                    }
                }
            }

            if (refresh) slips =  await this.salarySlipRepository.where(req, {
                '$Employee.Position.type$': 'White'
            }, [
                {
                    model: db.Employee,
                    attributes: ['position_id', 'fullname'],
                    include: [
                        {
                            model: db.Position,
                            attributes: ['type']
                        }
                    ]
                },
                {
                    model: db.Allowance,
                    attributes: ['amount']
                }
            ]);

            return slips;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in SalarySlipService - findAllSalarySlips: ' + error.message);
            }
            throw error;
        }
    }

    async getBlueSalarySlipForIndex(req: Request): Promise<Model<SalarySlipAttributes>[]> {
        try {
            interface Recapped {
                [key: string]: { // tahun
                    [key: string]: { // bulan 
                        [key: string]:  // employee id
                            {
                                start_date: Date,
                                end_date: Date
                            }
                    }
                };
            }

            const recapped: Recapped = {};
            let fetchedPresenceId: number[] = [];
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            let refresh = false;

            let slips = await this.salarySlipRepository.where(req, {
                '$Employee.Position.type$': 'Blue'
            }, [
                {
                    model: db.Employee,
                    attributes: ['position_id', 'fullname'],
                    include: [
                        {
                            model: db.Position,
                            attributes: ['type']
                        }
                    ]
                },
                {
                    model: db.Allowance,
                    attributes: ['amount']
                }
            ]);
            const presences = await this.presenceBlueService.findAll(req);

            presences.map((item) => {
                if (item.dataValues.check_in && !item.dataValues.is_recapped_in_salary_slip && item.dataValues.pkid) {
                    fetchedPresenceId.push(item.dataValues.pkid);
                    const date = new Date(item.dataValues.check_in);
                    const year = date.getFullYear().toString();
                    const month = date.getMonth().toString();

                    if (!recapped[year]) {
                        recapped[year] = {};
                    }
                    
                    if (!recapped[year][month]) {
                        recapped[year][month] = {};
                    }

                    if (!recapped[year][month][item.dataValues.employee_id.toString()]) {
                        recapped[year][month][item.dataValues.employee_id.toString()] = {
                            start_date: new Date(item.dataValues.check_in),
                            end_date: new Date(item.dataValues.check_out ?? item.dataValues.check_in),
                        }
                    }

                    if (recapped[year][month][item.dataValues.employee_id.toString()].start_date > new Date(item.dataValues.check_in)) {
                        recapped[year][month][item.dataValues.employee_id.toString()].start_date = new Date(item.dataValues.check_in);
                    }

                    if (item.dataValues?.check_out !== undefined) {
                        if (recapped[year][month][item.dataValues.employee_id.toString()].end_date < new Date(item.dataValues?.check_out)) {
                            recapped[year][month][item.dataValues.employee_id.toString()].end_date = new Date(item.dataValues.check_out);
                        }
                    }
                }
            });

            // create salary slip
            for (const year in recapped) {
                for (const month in recapped[year]) {
                    for (const employeeId in recapped[year][month]) {
                        // push empty salary slip
                        refresh = true;

                        await this.salarySlipRepository.create(req, {
                            // pkid: generateSalarySlipId(),
                            employee_id: parseInt(employeeId),
                            year: parseInt(year),
                            month: months[parseInt(month)],
                            start_date: recapped[year][month][employeeId].start_date,
                            last_date: recapped[year][month][employeeId].end_date,
                            status: 'Not Written In Journal'
                        });
                    }
                }
            }

            // update presence blue
            fetchedPresenceId.forEach(item => {
                this.presenceBlueService.update(req, item, {is_recapped_in_salary_slip: true});
            })

            if (refresh) slips =  await this.salarySlipRepository.where(req, {
                '$Employee.Position.type$': 'Blue'
            }, [
                {
                    model: db.Employee,
                    attributes: ['position_id', 'fullname'],
                    include: [
                        {
                            model: db.Position,
                            attributes: ['type']
                        }
                    ]
                },
                {
                    model: db.Allowance,
                    attributes: ['amount']
                }
            ]);

            return slips;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in SalarySlipService - findAllSalarySlips: ' + error.message);
            }
            throw error;
        }
    }

    addBonus (overtime: Model<OvertimeAttributes>[], overtime_type: string, overtime_hours: number, white_payroll: number): number {
        let total = 0;
        let hourIteration = 0;

        const overtimeFiltered = overtime.filter((item) => item.dataValues.type === overtime_type).sort(a => a.dataValues.jam_pertama);

        overtimeFiltered.forEach(element => {
            const jamPertama = element.dataValues.jam_pertama;
            if (hourIteration != overtime_hours) {
                let multiplier = 0;

                if (jamPertama <= overtime_hours) multiplier = jamPertama - hourIteration;
                else multiplier = overtime_hours - hourIteration;

                if (element.dataValues.overtime_rate_type === 'Nominal') {
                    total += multiplier * element.dataValues.overtime_rate_ph;
                }
                else if (element.dataValues.overtime_rate_type === 'Percentage') {
                    total += multiplier * (element.dataValues.overtime_rate_ph / 100 * (white_payroll));
                }

                hourIteration += multiplier;
            }
        });

        return total;
    }

    async countSalarySlip(req: Request, data: CountSalarySlipInputVM): Promise<CountSalarySlipOutputVM> {
        const employee_id = data.countInput.employee_id;
        const gaji_pokok = data.countInput.gaji_pokok;
        const tunjangan_lain = data.countInput.tunjangan_lain;
        const penalti = data.countInput.penalti;
        const month = data.countInput.month;
        const year = data.countInput.year;

        // mengambil tunjangan tetap
        const employee = await this.employeeService.findByPKID(req, employee_id, [{
            model: db.PTKP
        }]);
        const position = employee?.dataValues.Position;
        const tunjangan_tetap_position = position?.tunjangan_tetap || 0;

        const ptkpFetch = employee?.dataValues.PTKP;
        const ptkp_id = ptkpFetch?.pkid;

        if (ptkp_id === undefined) throw new Error('PTKP not found');
        const tunjangan_tetap_ptkp = ptkpFetch?.tunjangan_tetap || 0;

        let penghasilanTetap = gaji_pokok + tunjangan_tetap_position + tunjangan_tetap_ptkp - penalti;

        // get percentage from bpjs
        const bpjs = await this.salaryPercentageRepository.findAll(req);
        if (bpjs.length === 0) throw new Error('BPJS not found');
        const bpjs_data = bpjs[0]?.dataValues;

        // get asuransi pribadi
        const asuransi = employee?.dataValues.Asuransi;

        // get amal
        const amal = employee?.dataValues.Amal;
                
        // deduction & benefit count
        let benefit_bpjs_kesehatan = 0;
        let benefit_bpjs_tk_jht = 0;
        let benefit_bpjs_tk_jkk = 0;
        let benefit_bpjs_tk_jkm = 0;
        let benefit_bpjs_tk_jp = 0;

        let deduction_asuransi_pribadi = 0;
        let deduction_amal = 0;
        let deduction_bpjs_kesehatan = 0;
        let deduction_bpjs_tk_jht = 0;
        let deduction_bpjs_tk_jp = 0;

        if (asuransi !== undefined) {
            if (asuransi?.asuransi_type === 'Percentage') {
                deduction_asuransi_pribadi = asuransi?.asuransi_amount / 100 * penghasilanTetap;
            }
            else if (asuransi?.asuransi_type === 'Nominal') {
                deduction_asuransi_pribadi = asuransi?.asuransi_amount;
            }
        }
        if (amal !== undefined) {
            if (amal?.amal_type === 'Percentage') {
                deduction_amal = amal?.amal_amount / 100 * penghasilanTetap;
            }
            else if (amal?.amal_type === 'Nominal') {
                deduction_amal = amal?.amal_amount;
            }
        }
        if (bpjs_data?.is_adding_bpjs_kesehatan) {
            if (bpjs_data?.bpjs_kesehatan_type === 'Percentage') {
                benefit_bpjs_kesehatan = bpjs_data?.bpjs_kesehatan_perusahaan / 100 * (penghasilanTetap > 12000000 ? 12000000 : penghasilanTetap);
                deduction_bpjs_kesehatan = bpjs_data?.bpjs_kesehatan_pribadi / 100 * (penghasilanTetap > 12000000 ? 12000000 : penghasilanTetap);
            }
            else if (bpjs_data?.bpjs_kesehatan_type === 'Nominal') {
                benefit_bpjs_kesehatan = bpjs_data?.bpjs_kesehatan_perusahaan;
                deduction_bpjs_kesehatan = bpjs_data?.bpjs_kesehatan_pribadi;
            }
        }
        if (bpjs_data?.is_adding_bpjs_ketenagakerjaan_jht) {
            if (bpjs_data?.bpjs_ketenagakerjaan_jht_type === 'Percentage') {
                benefit_bpjs_tk_jht = bpjs_data?.bpjs_ketenagakerjaan_jht_perusahaan / 100 * (penghasilanTetap > 10000000 ? 10000000 : penghasilanTetap);
                deduction_bpjs_tk_jht = bpjs_data?.bpjs_ketenagakerjaan_jht_pribadi / 100 * (penghasilanTetap > 10000000 ? 10000000 : penghasilanTetap);
            }
            else if (bpjs_data?.bpjs_ketenagakerjaan_jht_type === 'Nominal') {
                benefit_bpjs_tk_jht = bpjs_data?.bpjs_ketenagakerjaan_jht_perusahaan;
                deduction_bpjs_tk_jht = bpjs_data?.bpjs_ketenagakerjaan_jht_pribadi;
            }
        }
        if (bpjs_data?.is_adding_bpjs_ketenagakerjaan_jkk) {
            if (bpjs_data?.bpjs_ketenagakerjaan_jkk_type === 'Percentage') {
                benefit_bpjs_tk_jkk = bpjs_data?.bpjs_ketenagakerjaan_jkk_perusahaan / 100 * penghasilanTetap;
            }
            else if (bpjs_data?.bpjs_ketenagakerjaan_jkk_type === 'Nominal') {
                benefit_bpjs_tk_jkk = bpjs_data?.bpjs_ketenagakerjaan_jkk_perusahaan;
            }
        }
        if (bpjs_data?.is_adding_bpjs_ketenagakerjaan_jkm) {
            if (bpjs_data?.bpjs_ketenagakerjaan_jkm_type === 'Percentage') {
                benefit_bpjs_tk_jkm = bpjs_data?.bpjs_ketenagakerjaan_jkm_perusahaan / 100 * (penghasilanTetap > 10000000 ? 10000000 : penghasilanTetap);
            }
            else if (bpjs_data?.bpjs_ketenagakerjaan_jkm_type === 'Nominal') {
                benefit_bpjs_tk_jkm = bpjs_data?.bpjs_ketenagakerjaan_jkm_perusahaan;
            }
        }
        if (bpjs_data?.is_adding_bpjs_ketenagakerjaan_jp) {
            if (bpjs_data?.bpjs_ketenagakerjaan_jp_type === 'Percentage') {
                benefit_bpjs_tk_jp = bpjs_data?.bpjs_ketenagakerjaan_jp_perusahaan / 100 * (penghasilanTetap > 10000000 ? 10000000 : penghasilanTetap);
                deduction_bpjs_tk_jp = bpjs_data?.bpjs_ketenagakerjaan_jp_pribadi / 100 * (penghasilanTetap > 10000000 ? 10000000 : penghasilanTetap);
            }
            else if (bpjs_data?.bpjs_ketenagakerjaan_jp_type === 'Nominal') {
                benefit_bpjs_tk_jp = bpjs_data?.bpjs_ketenagakerjaan_jp_perusahaan;
                deduction_bpjs_tk_jp = bpjs_data?.bpjs_ketenagakerjaan_jp_pribadi;
            }
        }

        benefit_bpjs_kesehatan = parseFloat(benefit_bpjs_kesehatan.toFixed(2))
        benefit_bpjs_tk_jht = parseFloat(benefit_bpjs_tk_jht.toFixed(2));
        benefit_bpjs_tk_jkk = parseFloat(benefit_bpjs_tk_jkk.toFixed(2));
        benefit_bpjs_tk_jkm = parseFloat(benefit_bpjs_tk_jkm.toFixed(2));
        benefit_bpjs_tk_jp = parseFloat(benefit_bpjs_tk_jp.toFixed(2));

        deduction_asuransi_pribadi = parseFloat(deduction_asuransi_pribadi.toFixed(2));
        deduction_amal = parseFloat(deduction_amal.toFixed(2));
        deduction_bpjs_kesehatan = parseFloat(deduction_bpjs_kesehatan.toFixed(2));
        deduction_bpjs_tk_jht = parseFloat(deduction_bpjs_tk_jht.toFixed(2));
        deduction_bpjs_tk_jp = parseFloat(deduction_bpjs_tk_jp.toFixed(2));

        let penghasilanBruto = penghasilanTetap + benefit_bpjs_kesehatan + benefit_bpjs_tk_jht + benefit_bpjs_tk_jkk + benefit_bpjs_tk_jkm + benefit_bpjs_tk_jp + (tunjangan_lain ?? 0);
        penghasilanBruto = parseFloat(penghasilanBruto.toFixed(2));

        let deduction_pph21 = 0;

        // hitung pajak berdasarkan bulan
        if (month < 11) {
            const ter_category = ptkpFetch?.ter_category;
            if (ter_category === undefined) throw new Error('TerPPh not found');

            const terPPh = await this.terPPHService.getTerPPhByIncome(req, new GetTerPPhByIncomeInputVM({income: penghasilanBruto, ter_category}));
            if (terPPh.length === 0) throw new Error('TerPPh not found');
            const ter_percentage = terPPh[0]?.dataValues.ter_pct || 0;


            deduction_pph21 = ter_percentage / 100 * penghasilanBruto;
        }
        else if (month === 11) {
            const count_bukpot = await this.bukpotService.countBukpot(req, new CountBukpotInputVM({employee_id, ptkp_id, year}));
            deduction_pph21 = count_bukpot.bukpotOutput.last_month_pph21;
        }

        deduction_pph21 = parseFloat(deduction_pph21.toFixed(2));

        const returnData = new CountSalarySlipOutputVM({
            gaji_pokok,
            tunjangan_tetap_position,
            tunjangan_tetap_ptkp,
            benefit_bpjs_kesehatan,
            benefit_bpjs_tk_jht,
            benefit_bpjs_tk_jkk,
            benefit_bpjs_tk_jkm,
            benefit_bpjs_tk_jp,
            deduction_asuransi_pribadi,
            deduction_amal,
            deduction_bpjs_kesehatan,
            deduction_bpjs_tk_jht,
            deduction_bpjs_tk_jp,
            deduction_pph21,
            penghasilanTetap,
            penghasilanBruto,
            takeHomePay: parseFloat((
                penghasilanTetap 
                + (tunjangan_lain ?? 0)
                - deduction_bpjs_kesehatan 
                - deduction_bpjs_tk_jht 
                - deduction_bpjs_tk_jp
                - deduction_pph21 
                - deduction_asuransi_pribadi
                - deduction_amal).toFixed(2)),
        });

        return returnData;
    }

    async countSalaryWhite(req: Request, bodyData: CountPresenceWhiteInputVM): Promise<CountSalaryWhiteOutputVM> {
        const employee_id = bodyData.bukpotInput.employee_id;

        let salary = 0

        const data = await this.countHourSalaryWhite(req, bodyData); 
        const overtime = await this.overtimeService.findAll(req);
        const configuration = await this.configurationService.findAll(req);
        if (configuration.length === 0) throw new Error('Configuration not found');
        const whitePayroll = await this.employeeService.getCurrentWhitePayrollByEmployeeID(req, employee_id);

        if (whitePayroll === null) throw new Error('WhitePayroll not found');

        // add base salary
        salary += whitePayroll ?? 0;

        // subtract penalti
        const penaltiHours = data.countInput.penaltiHours;
        let penalti = 0
        if (configuration[0]?.dataValues.white_is_penalty_given && penaltiHours > 0) {
            const white_late_salary_penalty_ph = configuration[0].dataValues.white_late_salary_penalty_ph ?? 0
            if (configuration[0].dataValues.white_late_salary_penalty_type === 'Nominal') {
                penalti = white_late_salary_penalty_ph * penaltiHours;
            }
            else if (configuration[0].dataValues.white_late_salary_penalty_type === 'Percentage') {
                penalti = whitePayroll ?? 0 * (penaltiHours * white_late_salary_penalty_ph) / 100;
            }
            penalti = parseFloat(penalti.toFixed(2));
            salary -= penalti;
        }

        // add overtime bonus
        const overtimeHariKerjaHours = data.countInput.overtimeHariKerjaHours
        let bonusOvertimeHariKerja = 0;
        if (overtimeHariKerjaHours > 0) {
            bonusOvertimeHariKerja = this.addBonus(overtime, "Hari kerja", overtimeHariKerjaHours, whitePayroll ?? 0);
            bonusOvertimeHariKerja = parseFloat(bonusOvertimeHariKerja.toFixed(2));
            salary += bonusOvertimeHariKerja;

        } 
        const overtimeHariLiburHours = data.countInput.overtimeHariLiburHours
        let bonusOvertimeHariLibur = 0;
        if (overtimeHariLiburHours > 0) {
            bonusOvertimeHariLibur = this.addBonus(overtime, "Hari libur", overtimeHariLiburHours, whitePayroll ?? 0);
            bonusOvertimeHariLibur = parseFloat(bonusOvertimeHariLibur.toFixed(2));
            salary += bonusOvertimeHariLibur;
        }
        const overtimeHariLiburNasionalHours = data.countInput.overtimeLiburNasionalHours
        let bonusOvertimeHariLiburNasional = 0;
        if (overtimeHariLiburNasionalHours > 0) {
            bonusOvertimeHariLiburNasional = this.addBonus(overtime, "Hari libur nasional", overtimeHariLiburNasionalHours, whitePayroll ?? 0);
            bonusOvertimeHariLiburNasional = parseFloat(bonusOvertimeHariLiburNasional.toFixed(2));
            salary += bonusOvertimeHariLiburNasional;
        }

        return new CountSalaryWhiteOutputVM({
            baseSalary: whitePayroll,
            penalti,
            bonusOvertimeHariKerja,
            bonusOvertimeHariLibur,
            bonusOvertimeHariLiburNasional,
            salary: salary > 0 ? parseFloat(salary.toFixed(2)) : 0
        });
    }

    async countHourSalaryWhite(req: Request, data: CountPresenceWhiteInputVM): Promise<CountHourSalaryWhiteOuputVM> {
        const month = data.bukpotInput.month;
        const year = data.bukpotInput.year;

        const dayOff = await this.dayOffService.findDayOffByMonthAndYear(req, month, year);
        const presence = await this.presenceWhiteService.countPresenceWhite(req, data);
        const configuration = await this.configurationService.findAll(req);

        if (configuration.length === 0) throw new Error('Configuration not found');

        const startDateTemp = new Date(year, month - 1, 1);
        const endDateTemp = new Date(year, month, 0);

        const startDate = new Date(startDateTemp.getTime() + 24 * 60 * 60 * 1000);
        let endDate = new Date(endDateTemp.getTime() + 24 * 60 * 60 * 1000);
        const today = new Date();

        let currentDate = startDate;
        if (endDate > today) endDate = today;

        let workNormalHour = 0;
        let penaltiHours = 0;
        let overtimeHariKerjaHours = 0;
        let overtimeHariLiburHours = 0;
        let overtimeLiburNasionalHours = 0;

        while (currentDate <= endDate) {
            const dayOfWeek = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000).toLocaleString('en-US', { weekday: 'long' });
            const workingDays = configuration[0]?.dataValues.white_working_days_per_week ?? 0;

            let isDayOff = false;

            let currentPresence = presence.filter((item: any) => (item.dataValues.date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]));
            let currentDayOff = dayOff.filter((item: any) => (item.dataValues.date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]));

            if (currentDayOff.length > 0) isDayOff = true;

            if (
                (currentPresence[0]?.dataValues?.check_in) &&
                (configuration[0]?.dataValues?.white_start_time) &&
                (configuration[0]?.dataValues?.white_work_duration) &&
                (dayOfWeek !== 'Friday' || workingDays > 4) &&
                (dayOfWeek !== 'Saturday' || workingDays > 5) &&
                (dayOfWeek !== 'Sunday' || workingDays > 6) 
            ) { 
                if (isDayOff && currentPresence[0]?.dataValues?.check_out) {
                    // Hitung jam kerja lembur libur nasional
                    const presenceStartTime = new Date(currentPresence[0]?.dataValues?.check_in);
                    const presenceEndTime = new Date(currentPresence[0]?.dataValues?.check_out);

                    const timeDifference = presenceEndTime.getTime() - presenceStartTime.getTime();

                    // -- HASIL --
                    overtimeLiburNasionalHours += timeDifference / (1000 * 60 * 60);
                }
                else {
                    // 1. Hitung jam telat
                    const configurationStartTime = new Date (currentDate.toISOString().split('T')[0] + " " + configuration[0]?.dataValues?.white_start_time.toString());
                    const presenceStartTime = new Date(currentPresence[0]?.dataValues?.check_in);

                    const startTimeDifference = presenceStartTime.getTime() - configurationStartTime.getTime();

                    // -- HASIL --
                    const lateHours = startTimeDifference / (1000 * 60 * 60);

                    if (lateHours > 0) penaltiHours += lateHours;
                    else overtimeHariKerjaHours += lateHours;

                    // 2. Hitung jam kerja
                    const splitConfigurationWorkDuration = configuration[0]?.dataValues?.white_work_duration.split(":");
                    const hourWorkDuration = parseInt(splitConfigurationWorkDuration[0], 10);
                    const minuteWorkDuration = parseInt(splitConfigurationWorkDuration[1], 10);
                    const workDuration = hourWorkDuration + minuteWorkDuration / 60;

                    workNormalHour += workDuration

                    // 3. Hitung overtime di hari kerja
                    const presenceEndTime = currentPresence[0]?.dataValues?.check_out;
                    if (presenceEndTime) { // if not null, try to count for overtime
                        const splitConfigurationStartDuration = configuration[0]?.dataValues?.white_start_time.split(":");
                        const hourStartDuration = parseInt(splitConfigurationStartDuration[0], 10);
                        const minuteStartDuration = parseInt(splitConfigurationStartDuration[1], 10);

                        const configurationEndTime = new Date(currentDate.toISOString().split('T')[0] + " " + (hourStartDuration + hourWorkDuration) + ":" + (minuteStartDuration + minuteWorkDuration) + ":00");
                        const timeDifference2 = presenceEndTime.getTime() - configurationEndTime.getTime();

                        // -- HASIL --
                        overtimeHariKerjaHours += timeDifference2 / (1000 * 60 * 60);
                    }
                }
            }
            else if (currentPresence[0]?.dataValues?.check_in && currentPresence[0]?.dataValues?.check_out) {
                // 4. Hitung overtime di hari libur
                const presenceStartTime = new Date(currentPresence[0]?.dataValues?.check_in);
                const presenceEndTime = new Date(currentPresence[0]?.dataValues?.check_out);

                const timeDifference = presenceEndTime.getTime() - presenceStartTime.getTime();

                // -- HASIL --
                overtimeHariLiburHours += timeDifference / (1000 * 60 * 60);
            }
            else {
                // 5. Hitung penalti karena absen
                if (configuration[0]?.dataValues?.white_work_duration) {
                    const splitConfigurationWorkDuration = configuration[0]?.dataValues?.white_work_duration.split(":");
                    const hourWorkDuration = parseInt(splitConfigurationWorkDuration[0], 10);
                    const minuteWorkDuration = parseInt(splitConfigurationWorkDuration[1], 10);
                    const workDuration = hourWorkDuration + minuteWorkDuration / 60;

                    penaltiHours += workDuration;
                }
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        const bodyData = new CountHourSalaryWhiteOuputVM({
            workNormalHour,
            penaltiHours,
            overtimeHariKerjaHours,
            overtimeHariLiburHours,
            overtimeLiburNasionalHours,
        });

        return bodyData;
    }

    async countFromWhiteSalarySlip(req: Request, id: number): Promise<CountSalarySlipVM> {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const salarySlip = await this.salarySlipRepository.findByID(req, id);

        if (salarySlip === null) throw new Error('Salary slip not found');

        let gaji_pokok;
        let penalti;
        let gaji_lembur;

        const gaji_pokok_data = new CountPresenceWhiteInputVM({
            employee_id: salarySlip.dataValues.employee_id,
            month: months.indexOf(salarySlip.dataValues.month) + 1,
            year: salarySlip.dataValues.year,
        });

        const count_salary = await this.countSalaryWhite(req, gaji_pokok_data);
        gaji_pokok = count_salary.countOutput.baseSalary;
        penalti = count_salary.countOutput.penalti;
        gaji_lembur = count_salary.countOutput.bonusOvertimeHariKerja + count_salary.countOutput.bonusOvertimeHariLibur + count_salary.countOutput.bonusOvertimeHariLiburNasional;

        let tunjangan_lain = gaji_lembur;
        const allowances = await this.allowanceService.where(req, {
            ss_id: id
        });
        allowances.map((item) => {
            tunjangan_lain += item.dataValues.amount;
        });

        const data = new CountSalarySlipInputVM({
            employee_id: salarySlip.dataValues.employee_id,
            gaji_pokok,
            penalti,
            gaji_lembur,
            tunjangan_lain,
            month: months.indexOf(salarySlip.dataValues.month) + 1,
            year: salarySlip.dataValues.year,
        });

        const salary_slip_count = await this.countSalarySlip(req, data);

        const res = new CountSalarySlipVM(data, salary_slip_count);

        return res;
    }

    async countHourSalaryBlue(req: Request, bodyData: CountHourPresenceBlueByStartLastDateInputVM, position: PositionAttributes): Promise<CountHourSalaryBlueOutputVM> {
        const hours = await this.presenceBlueService.countHourPresenceBlueByStartLastDate(req, bodyData);
        const configuration = await this.configurationService.findAll(req);

        if (configuration.length === 0) throw new Error('Configuration not found');

        const work_hour = hours.bukpotOutput.work_hour;
        const penalty_hour = hours.bukpotOutput.penalty_hour

        if (!position.blue_cost_ph) throw new Error ('Position does not have blue salary');

        const salary_per_hour = position?.blue_cost_ph;
        const work_hour_salary = work_hour * salary_per_hour;

        // count penalty
        let penalty_hour_salary = 0;
        const penalty_per_hour = configuration[0]?.dataValues.blue_late_salary_penalty_ph ?? 0;
        if (configuration[0]?.dataValues.blue_late_salary_penalty_type === 'Percentage') {
            penalty_hour_salary = penalty_hour * salary_per_hour * penalty_per_hour / 100;
        }
        else if (configuration[0]?.dataValues.blue_late_salary_penalty_type === 'Nominal') {
            penalty_hour_salary = penalty_hour * penalty_per_hour;
        }

        const returnData = new CountHourSalaryBlueOutputVM({
            work_hour,
            work_hour_salary,
            penalty_hour_salary
        })

        return returnData;
    }

    async countSalarySlipBlue(req: Request, data: CountSalaryBlueInputVM): Promise<CountSalaryBlueOutputVM> {
        const employee_id = data.countInput.employee_id
        const gaji_pokok = data.countInput.gaji_pokok
        const penalti = data.countInput.penalti
        const tunjangan_lain = data.countInput.tunjangan_lain
        const start_date = data.countInput.start_date
        const last_date = data.countInput.last_date

        // mengambil tunjangan tetap
        const employee = await this.employeeService.findByPKID(req, employee_id);

        let penghasilanTetap = gaji_pokok - penalti;

        // get asuransi pribadi
        const asuransi = employee?.dataValues.Asuransi;

        // get amal
        const amal = employee?.dataValues.Amal;
                
        // deduction & benefit count
        let deduction_asuransi_pribadi = 0;
        let deduction_amal = 0;

        if (asuransi !== undefined) {
            if (asuransi?.asuransi_type === 'Percentage') {
                deduction_asuransi_pribadi = asuransi?.asuransi_amount / 100 * penghasilanTetap;
            }
            else if (asuransi?.asuransi_type === 'Nominal') {
                deduction_asuransi_pribadi = asuransi?.asuransi_amount;
            }
        }
        if (amal !== undefined) {
            if (amal?.amal_type === 'Percentage') {
                deduction_amal = amal?.amal_amount / 100 * penghasilanTetap;
            }
            else if (amal?.amal_type === 'Nominal') {
                deduction_amal = amal?.amal_amount;
            }
        }

        deduction_asuransi_pribadi = parseFloat(deduction_asuransi_pribadi.toFixed(2));
        deduction_amal = parseFloat(deduction_amal.toFixed(2));

        let penghasilanBruto = penghasilanTetap + tunjangan_lain;
        penghasilanBruto = parseFloat(penghasilanBruto.toFixed(2));

        let deduction_pph21 = 0;
        // hitung pajak berdasarkan bulan
        
        const start_date_temp = new Date(start_date);
        const last_date_temp = new Date(last_date);
        const start_date_converted = new Date(start_date_temp.toISOString().split('T')[0]);
        const last_date_converted = new Date(last_date_temp.toISOString().split('T')[0]);

        let differenceMs = last_date_converted.getTime() - start_date_converted.getTime();
        if (differenceMs < 0) differenceMs = 0;
        const differenceDays = (differenceMs / (1000 * 60 * 60 * 24)) + 1;

        let salary_per_month = penghasilanBruto / differenceDays;

        console.log(penghasilanBruto);

        if (salary_per_month > 450000  && salary_per_month < 2500000) {
            deduction_pph21 = 0.5 / 100 * penghasilanBruto
        }
        else if (salary_per_month >= 2500000) {
            console.log("masuk");

            deduction_pph21 = 5 / 100 * penghasilanBruto;
        }

        deduction_pph21 = parseFloat(deduction_pph21.toFixed(2));
        console.log(deduction_pph21);


        const returnData = new CountSalaryBlueOutputVM({
            gaji_pokok,
            deduction_asuransi_pribadi,
            deduction_amal,
            deduction_pph21,
            penghasilanTetap,
            penghasilanBruto,
            takeHomePay: parseFloat((
                penghasilanBruto
                - deduction_pph21 
                - deduction_asuransi_pribadi
                - deduction_amal).toFixed(2)),
        });

        return returnData;
    }

    async countFromBlueSalarySlip(req: Request, id: number, tunjangan_lain_arg: number): Promise<CountSalaryBlueVM> {
        const salarySlip = await this.salarySlipRepository.findByID(req, id, [{
            model: db.Employee,
            include: [{ model: db.Position }]
        }]);

        if (salarySlip === null) throw new Error('Salary slip not found');

        let gaji_pokok;
        let penalti;

        const gaji_pokok_data = new CountHourPresenceBlueByStartLastDateInputVM({
            employee_id: salarySlip.dataValues.employee_id,
            start_date: salarySlip.dataValues.start_date,
            last_date: salarySlip.dataValues.last_date,
        });

        if (!salarySlip.dataValues?.Employee?.Position) throw new Error('Employee do not have a position');

        const count_salary = await this.countHourSalaryBlue(req, gaji_pokok_data, salarySlip.dataValues?.Employee?.Position);
        const work_hour = count_salary.countInput.work_hour;
        gaji_pokok = count_salary.countInput.work_hour_salary;
        penalti = count_salary.countInput.penalty_hour_salary;

        let tunjangan_lain = tunjangan_lain_arg;

        const data = new CountSalaryBlueInputVM({
            employee_id: salarySlip.dataValues.employee_id,
            gaji_pokok,
            penalti,
            tunjangan_lain,
            work_hour,
            start_date: salarySlip.dataValues.start_date,
            last_date: salarySlip.dataValues.last_date,
        });

        const salary_slip_count = await this.countSalarySlipBlue(req, data);

        const res = new CountSalaryBlueVM(data, salary_slip_count);

        return res;
    }
}
