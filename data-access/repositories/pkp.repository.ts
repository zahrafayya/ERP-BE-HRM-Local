import { BaseRepository } from '../utility/base.repository';
import { PKP } from '../../infrastructure/models/pkp.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class PKPRepository extends BaseRepository<PKP> {
    constructor() {
        super(db.PKP as ModelStatic<PKP>);
    }
}