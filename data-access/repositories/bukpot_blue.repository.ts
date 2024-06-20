import { BaseRepository } from '../utility/base.repository';
import { BukpotBlue } from '../../infrastructure/models/bukpot_blue.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class BukpotBlueRepository extends BaseRepository<BukpotBlue> {
    constructor() {
        super(db.BukpotBlue as ModelStatic<BukpotBlue>);
    }
}