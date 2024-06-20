import { BaseRepository } from '../utility/base.repository';
import { Bukpot } from '../../infrastructure/models/bukpot.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class BukpotRepository extends BaseRepository<Bukpot> {
    constructor() {
        super(db.Bukpot as ModelStatic<Bukpot>);
    }
}