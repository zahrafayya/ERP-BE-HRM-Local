import { PositionRepository } from '../../data-access/repositories/position.repository';
import { Position } from '../../infrastructure/models/position.model';
import { BaseService } from '../common/base.service';

export class PositionService extends BaseService<Position> {
    private positionRepository: PositionRepository;

    constructor() {
        const positionRepository = new PositionRepository();

        super(positionRepository);

        this.positionRepository = positionRepository;
    }
}
