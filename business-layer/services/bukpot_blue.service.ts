import { BukpotBlueRepository } from '../../data-access/repositories/bukpot_blue.repository';
import { SalarySlipRepository } from '../../data-access/repositories/salary_slip.repository';
import db from '../../infrastructure/models';
import { BukpotBlue, BukpotBlueAttributes } from '../../infrastructure/models/bukpot_blue.model';
import { Model } from 'sequelize';
import { BaseService } from '../common/base.service';
import { Request } from 'express';
import { AllowanceRepository } from '../../data-access/repositories/allowance.repository';
// import db from "../../infrastructure/models"

export class BukpotBlueService extends BaseService<BukpotBlue> {
    private bukpotBlueRepository: BukpotBlueRepository;
    private salarySlipRepository: SalarySlipRepository;
    private allowanceRepository: AllowanceRepository;

    constructor() {
        const bukpotBlueRepository = new BukpotBlueRepository();
        const salarySlipRepository = new SalarySlipRepository();
        const allowanceRepository = new AllowanceRepository();

        super(bukpotBlueRepository);

        this.bukpotBlueRepository = bukpotBlueRepository;
        this.salarySlipRepository = salarySlipRepository;
        this.allowanceRepository = allowanceRepository;
    }

    async getBukpotBlueForIndex(req: Request): Promise<Model<BukpotBlueAttributes>[]> {
        try {
            interface Recapped {
                [key: string]: { // tahun
                    [key: string]: { // bulan
                        [key: string]: // employee
                            {
                                is_bukpot_exist: boolean,

                            };
                    };
                }
            }

            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const recapped: Recapped = {};
            let refresh = false;

            let bukpots = await this.bukpotBlueRepository.findAll(req, [{
                model: db.Employee
            }]);
            const slips = await this.salarySlipRepository.where(req, {
                '$Employee.Position.type$': 'Blue'
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
                    const month = item.dataValues.month;
                    const employee_id = item.dataValues.employee_id.toString();
                
                    if (!recapped[year]) {
                        recapped[year] = {};
                    }

                    if (!recapped[year][month]) {
                        recapped[year][month] = {};
                    }

                    if (!recapped[year][month][employee_id]) {
                        recapped[year][month][employee_id] = {
                            is_bukpot_exist: false,
                        }
                    }
                }
            });


            bukpots.map((item) => {
                const year = item.dataValues.year;
                const month = item.dataValues.month;
                const employee_id = item.dataValues.employee_id.toString();

                if (!recapped[year]) {
                    recapped[year] = {};
                }

                if (!recapped[year][month]) {
                    recapped[year][month] = {};
                }

                recapped[year][month][employee_id] = {
                    is_bukpot_exist: true,
                }
                
            });


            for (const year in recapped) {
                for (const month in recapped[year]){
                    for (const employee_id in recapped[year][month]){

                        if (!recapped[year][month][employee_id].is_bukpot_exist) {
                            // push empty salary slip
                            refresh = true;

                            const data = {
                                employee_id: parseInt(employee_id),
                                month: month,
                                year: parseInt(year),
                                status: 'Not Verified'
                            };

                            await this.create(req, data);
                        }
                    }
                }
            }

            if (refresh) bukpots =  await this.bukpotBlueRepository.findAll(req);

            return bukpots;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in Salarybukpotservice - findAllSalarybukpots: ' + error.message);
            }
            throw error;
        }
    }

    async countBukpotBlue(req: Request, id: number): Promise<BukpotBlue> {
        try {
            const bukpot = await this.bukpotBlueRepository.findByID(req, id, [{
                model: db.Employee
            }]);

            if (bukpot === null) {
                throw new Error('Bukpot not found');
            }

            const salary_slips = await this.salarySlipRepository.where(req, {
                employee_id: bukpot.dataValues.employee_id,
                month: bukpot.dataValues.month,
                year: bukpot.dataValues.year
            });

            let penghasilan_bruto = 0;
            let pph_dipotong = 0;

            for (const item of salary_slips) {
                const allowances = await this.allowanceRepository.where(req, {
                    ss_id: item.dataValues.pkid
                });

                penghasilan_bruto += item.dataValues.gaji_pokok || 0;

                for (const allowance of allowances) {
                    penghasilan_bruto += allowance.dataValues.amount || 0;
                }

                pph_dipotong += item.dataValues.deduction_pph21 || 0;
            }

            const tarif_percentage = penghasilan_bruto !== 0 ? pph_dipotong / penghasilan_bruto : 0;

            const tarif = tarif_percentage * 100;


            bukpot.dataValues.penghasilan_bruto = penghasilan_bruto;
            bukpot.dataValues.pph_dipotong = pph_dipotong;
            bukpot.dataValues.tarif = tarif;

            return bukpot;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in Salarybukpotservice - findAllSalarybukpots: ' + error.message);
            }
            throw error;
        }
    }
}