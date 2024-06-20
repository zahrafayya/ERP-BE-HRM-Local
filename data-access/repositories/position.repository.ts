import { BaseRepository } from '../utility/base.repository';
import { Position } from '../../infrastructure/models/position.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class PositionRepository extends BaseRepository<Position> {
    constructor() {
        super(db.Position as ModelStatic<Position>);
    }
}