import { BaseRepository } from '../utility/base.repository';
import { Overtime } from '../../infrastructure/models/overtime.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class OvertimeRepository extends BaseRepository<Overtime> {
    constructor() {
        super(db.Overtime as ModelStatic<Overtime>);
    }
}