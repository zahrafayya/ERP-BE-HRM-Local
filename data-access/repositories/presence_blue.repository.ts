import { PresenceBlue } from '../../infrastructure/models/presence_blue.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'
import { BaseRepository } from '../utility/base.repository';

export class PresenceBlueRepository extends BaseRepository<PresenceBlue> {
    constructor() {
        super(db.PresenceBlue as ModelStatic<PresenceBlue>);
    }
}