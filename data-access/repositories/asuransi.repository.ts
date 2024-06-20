import { BaseRepository } from '../utility/base.repository';
import { Asuransi } from '../../infrastructure/models/asuransi.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class AsuransiRepository extends BaseRepository<Asuransi> {
    constructor() {
        super(db.Asuransi as ModelStatic<Asuransi>);
    }
}