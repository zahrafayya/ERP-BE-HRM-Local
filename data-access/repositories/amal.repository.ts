import { BaseRepository } from '../utility/base.repository';
import { Amal } from '../../infrastructure/models/amal.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class AmalRepository extends BaseRepository<Amal> {
    constructor() {
        super(db.Amal as ModelStatic<Amal>);
    }
}