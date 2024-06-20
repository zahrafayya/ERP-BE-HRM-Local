import { Configuration } from '../../infrastructure/models/configuration.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'
import { BaseRepository } from '../utility/base.repository';

export class ConfigurationRepository extends BaseRepository<Configuration> {
    constructor() {
        super(db.Configuration as ModelStatic<Configuration>);
    }
}