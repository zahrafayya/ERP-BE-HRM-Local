import { BaseRepository } from '../utility/base.repository';
import { WhitePayroll } from '../../infrastructure/models/white_payroll.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class WhitePayrollRepository extends BaseRepository<WhitePayroll> {
    constructor() {
        super(db.WhitePayroll as ModelStatic<WhitePayroll>);
    }
}