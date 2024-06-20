import { PKPRepository } from '../../data-access/repositories/pkp.repository';
import { PKP, PKPAttributes } from '../../infrastructure/models/pkp.model';
import { Model } from 'sequelize';
import { BaseService } from '../common/base.service';
import { Request } from 'express';

const { Op } = require('sequelize')

export class PKPService extends BaseService<PKP> {
    private pkpRepository: PKPRepository;

    constructor() {
        const pkpRepository = new PKPRepository();

        super(pkpRepository);

        this.pkpRepository = pkpRepository;
    }

    async getByNominal(req: Request, nominal: number): Promise<Model<PKPAttributes> | null> {
        try {
            const result = await this.pkpRepository.where(req, {
                pkp_max: {[Op.gt]: nominal},
                pkp_min: {[Op.lt]: nominal},
            });

            if (result.length === 0) {
                throw new Error('PKP not found')
            }

            return result[0];
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in PKPService - get nominal: ' + error.message);
            }
            throw error;
        }
    }
}
