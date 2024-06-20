import { EmployeeRepository } from "../../data-access/repositories/employee.repository";
import { PositionAttributes } from "../../infrastructure/models/position.model";
import { AsuransiAttributes } from "../../infrastructure/models/asuransi.model";
import {
  Employee,
  EmployeeAttributes,
} from "../../infrastructure/models/employee.model";
import { Op, Model } from "sequelize";
import { PTKPAttributes } from "../../infrastructure/models/ptkp.model";
import { BaseService } from "../common/base.service";
import { Request } from "express";
import {
  getAllRequestMan,
  getManSkillByPkid,
} from "../../data-access/integrations/manufacture.integration";

export class EmployeeService extends BaseService<Employee> {
  private employeeRepository: EmployeeRepository;

  constructor() {
    const employeeRepository = new EmployeeRepository();

    super(employeeRepository);

    this.employeeRepository = employeeRepository;
  }

  async findPositionByEmployeeID(
    req: Request,
    id: number
  ): Promise<Model<PositionAttributes> | null> {
    try {
      return await this.employeeRepository.findPositionByID(req, id);
    } catch (error) {
      if (error instanceof Error) {
        // Log the error or handle it as per your application's error handling policy
        throw new Error(
          "Error occurred in EmployeeService - findEmployeeByID: " +
            error.message
        );
      }
      throw error;
    }
  }

  async getCurrentWhitePayrollByEmployeeID(
    req: Request,
    id: number
  ): Promise<number | null> {
    try {
      let result = 0;
      await this.employeeRepository
        .findWhitePayrollByID(req, id)
        .then((item) => {
          const currentDate = new Date();
          const joinDate = new Date(item?.join_date ?? 0);
          const yearDifference =
            currentDate.getFullYear() - joinDate.getFullYear();

          if (yearDifference <= 33)
            result = item?.white_payroll[`tahun_${yearDifference}`];
          else result = item?.white_payroll[`tahun_33`];
        });

      return result;
    } catch (error) {
      if (error instanceof Error) {
        // Log the error or handle it as per your application's error handling policy
        throw new Error(
          "Error occurred in EmployeeService - findEmployeeByID: " +
            error.message
        );
      }
      throw error;
    }
  }

  async findPTKPByEmployeeID(
    req: Request,
    id: number
  ): Promise<Model<PTKPAttributes> | null> {
    try {
      return await this.employeeRepository.findPTKPByID(req, id);
    } catch (error) {
      if (error instanceof Error) {
        // Log the error or handle it as per your application's error handling policy
        throw new Error(
          "Error occurred in EmployeeService - findEmployeeByID: " +
            error.message
        );
      }
      throw error;
    }
  }

  async findAsuransiByEmployeeID(
    req: Request,
    id: number
  ): Promise<Model<AsuransiAttributes> | null> {
    try {
      return await this.employeeRepository.findAsuransiByID(req, id);
    } catch (error) {
      if (error instanceof Error) {
        // Log the error or handle it as per your application's error handling policy
        throw new Error(
          "Error occurred in EmployeeService - findEmployeeByID: " +
            error.message
        );
      }
      throw error;
    }
  }
  async findAllEmployees(req: Request): Promise<Model<EmployeeAttributes>[]> {
    try {
      return await this.employeeRepository.findAllEmployee(req);
    } catch (error) {
      if (error instanceof Error) {
        // Log the error or handle it as per your application's error handling policy
        throw new Error(
          "Error occurred in EmployeeService - findAllEmployees: " +
            error.message
        );
      }
      throw error;
    }
  }
  async getEmployeeAvailability(
    req: Request,
    man_skill_pkid: number,
    query_order: number
  ): Promise<any> {
    const allRequestMan = (await getAllRequestMan()).data.data ?? [];
    const getManSkillData = (await getManSkillByPkid(man_skill_pkid)).data.data;
    const getAllEmployee = await this.findAllEmployees(req);
    const allEmployee = getAllEmployee
      .map((employee) => {
        const employeeData = employee.toJSON() as EmployeeAttributes;
        const newEmployeeData = {
          pkid: employeeData.pkid,
          position_id: employeeData.position_id,
          end_date: new Date(),
          man_skill_pkid: man_skill_pkid,
        };

        return newEmployeeData;
      })
      .filter((employee) => employee.position_id == getManSkillData.position);
    const leftJoinResult = allEmployee
      .map((employee) => {
        const rightItem = allRequestMan.find(
          (rightItem: any) => rightItem.employee_pkid === employee.pkid
        );
        if (rightItem) {
          const endDate = new Date(rightItem.end_date);
          const employeeData = {
            pkid: employee.pkid,
            end_date: endDate,
            position_id: employee.position_id,
            man_skill_pkid: rightItem.man_skill_pkid,
          };
          return employeeData;
        } else {
          return employee;
        }
      })
      .filter((item) => item !== null);

    let whereManSkillId = leftJoinResult.filter(
      (employee) => employee?.man_skill_pkid == man_skill_pkid
    );

    if (query_order == 1) {
      whereManSkillId = whereManSkillId.filter(
        (employee) => employee && new Date(employee.end_date) <= new Date()
      );
    }

    const resultQuery = whereManSkillId.sort((a, b) => {
      if (a && b) {
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
      }
      return 0;
    });

    return resultQuery;
  }

  async updatePTKPVerification(req: Request, year: string): Promise<void> {
    try {
      const yearToInt = parseInt(year);
      const emps = await this.employeeRepository.where(
        req,
        {
          updated_ptkp_year: {
            [Op.lte]: yearToInt,
          },
          updated_ptkp_status: "Terverifikasi",
        },
        []
      );

      for (const emp of emps) {
        try {
          const employeeData = emp.toJSON() as EmployeeAttributes;

          if (employeeData.pkid) {
            let bodyData = {
              ptkp_id: employeeData.updated_ptkp_id,
              updated_ptkp_status: "Tidak ada pengajuan",
            };

            await this.employeeRepository.update(
              req,
              employeeData.pkid,
              bodyData
            );
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(
              "Error occurred in EmployeeService - update: " + error.message
            );
          }
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Error occurred in EmployeeService - update PTKP verification: " +
            error.message
        );
      }
      throw error;
    }
  }
}
