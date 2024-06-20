import { BaseRepository } from '../utility/base.repository';
import { PresenceWhite } from '../../infrastructure/models/presence_white.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class PresenceWhiteRepository extends BaseRepository<PresenceWhite> {
    constructor() {
        super(db.PresenceWhite as ModelStatic<PresenceWhite>);
    }
}