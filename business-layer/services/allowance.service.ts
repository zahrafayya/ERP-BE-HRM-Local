import { AllowanceRepository } from '../../data-access/repositories/allowance.repository';
import { AllowanceAttributes } from '../../infrastructure/models/allowance.model';
import { Allowance } from '../../infrastructure/models/allowance.model';
import { Model } from 'sequelize';
import { BaseService } from '../common/base.service';
import { Request } from 'express';

export class AllowanceService extends BaseService<Allowance> {
    private allowanceRepository: AllowanceRepository;

    constructor() {
        const allowanceRepository = new AllowanceRepository();

        super(allowanceRepository);

        this.allowanceRepository = allowanceRepository;
    }

    async findAllDistinctAllowanceNames(req: Request): Promise<Model<AllowanceAttributes>[]> {
        try {
            return await this.allowanceRepository.findAllDistinctName(req);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error occurred in AllowanceService - findAllAllowances: ' + error.message);
            }
            throw error;
        }
    }
}
