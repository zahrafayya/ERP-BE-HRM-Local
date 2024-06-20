import db from "../../infrastructure/models";
import { BaseRepository } from "../utility/base.repository";
import { Employee } from "../../infrastructure/models/employee.model";
import { Model, ModelStatic } from "sequelize";
import { PositionAttributes } from "../../infrastructure/models/position.model";
import { PTKPAttributes } from "../../infrastructure/models/ptkp.model";
import { AsuransiAttributes } from "../../infrastructure/models/asuransi.model";
import { EmployeeAttributes } from "../../infrastructure/models/employee.model";
import { Request } from "express";
import {
  WhitePayroll,
  WhitePayrollAttributes,
} from "../../infrastructure/models/white_payroll.model";

const { Op, Sequelize } = require("sequelize");

export class EmployeeRepository extends BaseRepository<Employee> {
  constructor() {
    super(db.Employee as ModelStatic<Employee>);
  }

  async findPositionByID(
    req: Request,
    id: number
  ): Promise<Model<PositionAttributes> | null> {
    try {
      const getInfo = await this.extractGetInfo(req);

      const employee = await db.Employee.findByPk(id, {
        where: getInfo,
        include: [
          {
            model: db.Position,
          },
        ],
      });

      // Return the Position directly if the employee is found
      return employee ? employee.Position : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error finding Employee: " + error.message);
      }
      throw error;
    }
  }

  async findWhitePayrollByID(
    req: Request,
    id: number
  ): Promise<{
    white_payroll: any;
    join_date: Date;
  } | null> {
    try {
      const getInfo = await this.extractGetInfo(req);

      const employee = await db.Employee.findByPk(id, {
        where: getInfo,
        include: [
          {
            model: db.Position,
            include: {
              model: db.WhitePayroll,
            },
          },
        ],
      });

      // Return the Position directly if the employee is found
      return employee?.Position
        ? {
            white_payroll: employee.Position?.WhitePayroll,
            join_date: employee.join_date,
          }
        : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error finding Employee: " + error.message);
      }
      throw error;
    }
  }

  async findPTKPByID(
    req: Request,
    id: number
  ): Promise<Model<PTKPAttributes> | null> {
    try {
      const getInfo = await this.extractGetInfo(req);

      const employee = await db.Employee.findByPk(id, {
        where: getInfo,
        include: [
          {
            model: db.PTKP,
          },
        ],
      });

      return employee?.PTKP ? employee.PTKP : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error finding Employee: " + error.message);
      }
      throw error;
    }
  }

  async findAsuransiByID(
    req: Request,
    id: number
  ): Promise<Model<AsuransiAttributes> | null> {
    try {
      const getInfo = await this.extractGetInfo(req);

      const employee = await db.Employee.findByPk(id, {
        where: getInfo,
        include: [
          {
            model: db.Asuransi,
          },
        ],
      });

      return employee?.Asuransi ? employee.Asuransi : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error finding Employee: " + error.message);
      }
      throw error;
    }
  }

  async getEmployeeAvailability(
    req: Request,
    man_skill_id: number,
    query_order: number
  ): Promise<Model<EmployeeAttributes>[]> {
    try {
      const getInfo = await this.extractGetInfo(req);

      const whereClause = Object.entries(getInfo)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(" AND ");

      var query = "";
      if (query_order == 1) {
        query = `SELECT * FROM (SELECT user_id, em.nip, COALESCE(max(mf_rm.mn_end_date), now()) as MAX_DATE, com.mf_man_skill_id
                FROM employees em
                LEFT JOIN mf_request_mans mf_rm on em.nip = mf_rm.employee_id
                JOIN competences com on em.position_id = com.position_id
                WHERE com.mf_man_skill_id = '${man_skill_id}'
                ${whereClause ? `AND ${whereClause}` : ""}
                GROUP BY user_id) as AE
                WHERE COALESCE(MAX_DATE, now()) <= now()
                ORDER BY MAX_DATE ASC;`;
      } else if (query_order == 2) {
        query = `SELECT * FROM (SELECT user_id, em.nip, COALESCE(max(mf_rm.mn_end_date), now()) as MAX_DATE, com.mf_man_skill_id
                FROM employees em
                LEFT JOIN mf_request_mans mf_rm on em.nip = mf_rm.employee_id
                JOIN competences com on em.position_id = com.position_id
                WHERE com.mf_man_skill_id = '${man_skill_id}'
                ${whereClause ? `AND ${whereClause}` : ""}
                GROUP BY user_id) as AE
                ORDER BY MAX_DATE ASC`;
      }

      const res = await Sequelize.query(query, {
        type: Op.SELECT,
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error finding Employee: " + error.message);
      }
      throw error;
    }
  }
  async findAllEmployee(req: Request): Promise<Model<EmployeeAttributes>[]> {
    try {
      return await db.Employee.findAll({
        include: [
          {
            model: db.RecruitmentRequest,
            attributes: ["position_id"],
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error creating Employee: " + error.message);
      }
      throw error;
    }
  }
}
