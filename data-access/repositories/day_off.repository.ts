import { BaseRepository } from '../utility/base.repository';
import { DayOff } from '../../infrastructure/models/day_off.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class DayOffRepository extends BaseRepository<DayOff> {
    constructor() {
        super(db.DayOff as ModelStatic<DayOff>);
    }
}