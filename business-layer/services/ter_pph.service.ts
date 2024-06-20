import { TerPPHRepository } from '../../data-access/repositories/ter_pph.repository';
import { GetTerPPhByIncomeInputVM } from '../../helpers/view-models/ter_pph.vm';
import { TerPPH } from '../../infrastructure/models/ter_pph.model';
import { BaseService } from '../common/base.service';
import { Request } from 'express';
import { Op } from 'sequelize';

export class TerPPHService extends BaseService<TerPPH> {
    private terPPHRepository: TerPPHRepository;

    constructor() {
        const terPPHRepository = new TerPPHRepository();

        super(terPPHRepository);

        this.terPPHRepository = terPPHRepository;
    }

    async getTerPPhByIncome(req: Request, data: GetTerPPhByIncomeInputVM) {
        const income = data.input.income
        const ter_category = data.input.ter_category;
        
        return this.terPPHRepository.where(req, {
            income_max: {[Op.gt]: income},
            income_min: {[Op.lt]: income},
            ter_category: ter_category,
        });
    }
}
