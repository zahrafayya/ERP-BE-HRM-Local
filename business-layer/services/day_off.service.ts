import { Model } from 'sequelize';
import { DayOffRepository } from '../../data-access/repositories/day_off.repository';
import { DayOff, DayOffAttributes } from '../../infrastructure/models/day_off.model';
import { BaseService } from '../common/base.service';
import { Request } from 'express';

const { Op } = require('sequelize')

export class DayOffService extends BaseService<DayOff> {
    private dayOffRepository: DayOffRepository;

    constructor() {
        const dayOffRepository = new DayOffRepository();

        super(dayOffRepository);

        this.dayOffRepository = dayOffRepository;
    }

    async findDayOffByMonthAndYear(req: Request, month: number, year: number): Promise<Model<DayOffAttributes>[]> {
        try {
            const startDate = new Date(year, month - 1, 1); // Note: month - 1 because month is zero-based in JavaScript Date
            const endDate = new Date(year, month, 0); // Last day of the month

            return await this.dayOffRepository.where(req, {
                date: {
                    [Op.between]: [startDate, endDate]
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in DayOffService - findAllDayOffs: ' + error.message);
            }
            throw error;
        }
    }
}
