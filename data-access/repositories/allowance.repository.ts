import db from '../../infrastructure/models'
import { BaseRepository } from '../utility/base.repository';
import { Allowance } from '../../infrastructure/models/allowance.model';
import { ModelStatic, Model, Sequelize } from 'sequelize';
import { AllowanceAttributes } from '../../infrastructure/models/allowance.model';
import { Request } from 'express';

export class AllowanceRepository extends BaseRepository<Allowance> {
    constructor() {
        super(db.Allowance as ModelStatic<Allowance>);
    }

    async findAllDistinctName(req: Request): Promise<Model<AllowanceAttributes>[]> {
        try {
            const getInfo = await this.extractGetInfo(req);

            const result = await db.Allowance.findAll({
                where: getInfo,
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
                ]
            });
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching unique Allowances: ' + error.message);
            }
            throw error;
        }
    }
}