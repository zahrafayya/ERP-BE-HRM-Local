import { BaseRepository } from '../utility/base.repository';
import { SalaryPercentage } from '../../infrastructure/models/salary_percentage.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class SalaryPercentageRepository extends BaseRepository<SalaryPercentage> {
    constructor() {
        super(db.SalaryPercentage as ModelStatic<SalaryPercentage>);
    }
}