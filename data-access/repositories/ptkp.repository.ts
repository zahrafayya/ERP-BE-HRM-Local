import { BaseRepository } from '../utility/base.repository';
import { PTKP } from '../../infrastructure/models/ptkp.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class PTKPRepository extends BaseRepository<PTKP> {
    constructor() {
        super(db.PTKP as ModelStatic<PTKP>);
    }
}