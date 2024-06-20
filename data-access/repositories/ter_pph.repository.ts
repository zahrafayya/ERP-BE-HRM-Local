import { BaseRepository } from '../utility/base.repository';
import { TerPPH } from '../../infrastructure/models/ter_pph.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class TerPPHRepository extends BaseRepository<TerPPH> {
    constructor() {
        super(db.TerPPH as ModelStatic<TerPPH>);
    }
}