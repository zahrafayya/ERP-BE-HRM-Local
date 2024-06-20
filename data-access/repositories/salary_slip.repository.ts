import { SalarySlip } from '../../infrastructure/models/salary_slip.model';
import { Model, ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'
import { BaseRepository } from '../utility/base.repository';

const { Op, Sequelize } = require('sequelize');

export class SalarySlipRepository extends BaseRepository<SalarySlip> {
    constructor() {
        super(db.SalarySlip as ModelStatic<SalarySlip>);
    }

    // async getYearlyGrossIncome(employee_id: number, year: number){
    //     const sequelize = db.Employee.sequelize;
    //     console.log("bodyData = dari repo -> ", employee_id, year)
    //     const sqlQuery = `
    //     SELECT 
    //         SUM(
    //             COALESCE(gaji_pokok, 0) + 
    //             COALESCE(income_pendapatan_lain, 0) + 
    //             COALESCE(benefit_bpjs_tk_jkk, 0)
    //         ) AS total_gross_income,
    //         SUM(
    //             COALESCE(reduction_pph21, 0)
    //         ) AS yearly_pph
    //     FROM 
    //         salary_slips
    //     WHERE year = :year
    //       AND employee_id = :employee_id
    //     `
    //     const replacements = {
    //         year: year,
    //         employee_id: employee_id
    //     }
    //     const result = await sequelize.query(sqlQuery, {
    //         replacements,
    //         type: Sequelize.QueryTypes.SELECT,
    //       });

    //     return result;
    // }
}