import { RecruitmentRequestRepository } from '../../data-access/repositories/recruitment_request.repository';
import { RecruitmentRequest, RecruitmentRequestAttributes } from '../../infrastructure/models/recruitment_request.model';
import { Model } from 'sequelize';
import { EmployeeRepository } from '../../data-access/repositories/employee.repository';
import { BaseService } from '../common/base.service';
import { Request } from 'express-serve-static-core';
import db from '../../infrastructure/models';

export class RecruitmentRequestService extends BaseService<RecruitmentRequest> {
    private recruitmentRequestRepository: RecruitmentRequestRepository;
    private employeeRepository: EmployeeRepository;

    constructor() {
        const recruitmentRequestRepository = new RecruitmentRequestRepository();
        const employeeRepository = new EmployeeRepository();

        super(recruitmentRequestRepository);

        this.recruitmentRequestRepository = recruitmentRequestRepository;
        this.employeeRepository = employeeRepository;
    }

    /**
     * Retrieves all RecruitmentRequests.
     */
    override async findAll(req: Request): Promise<Model<RecruitmentRequestAttributes>[]> {
        try {
            const reqs = await this.recruitmentRequestRepository.findAll(req, [
                {
                    model: db.Position,
                },
            ]);
            const emps= await this.employeeRepository.findAll(req);

            reqs.forEach((req) => {
                let count = 0;
                emps.forEach((emp) => {
                    if (emp.getDataValue('req_id') === req.getDataValue('pkid')) {
                        count++;
                    }
                })
                req.setDataValue('already_recruited', count);
            })

            return reqs;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in RecruitmentRequestService - findAllRecruitmentRequests: ' + error.message);
            }
            throw error;
        }
    }

    override async findByPKID(req: Request, id: number): Promise<Model<RecruitmentRequestAttributes> | null> {
        try {
            const result = await this.recruitmentRequestRepository.findByID(req, id);
            const emps= await this.employeeRepository.findAll(req);

            emps.forEach((emp) => {
                let count = 0;
                if (emp.getDataValue('req_id') === result?.getDataValue('pkid')) {
                    count++;
                }

                if (result) {
                    result.setDataValue('already_recruited', count);
                }
            })

            return result;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in RecruitmentRequestService - findRecruitmentRequestByID: ' + error.message);
            }
            throw error;
        }
    }
}
