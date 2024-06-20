import db from '../../infrastructure/models'
import { BaseRepository } from '../utility/base.repository';
import { AllowanceName } from '../../infrastructure/models/allowance_name.model';
import { ModelStatic } from 'sequelize';

export class AllowanceNameRepository extends BaseRepository<AllowanceName> {
    constructor() {
        super(db.AllowanceName as ModelStatic<AllowanceName>);
    }
}