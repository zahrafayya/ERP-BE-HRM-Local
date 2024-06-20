import { OvertimeRepository } from '../../data-access/repositories/overtime.repository';
import { Overtime } from '../../infrastructure/models/overtime.model';
import { BaseService } from '../common/base.service';

export class OvertimeService extends BaseService<Overtime> {
    private overtimeRepository: OvertimeRepository;

    constructor() {
        const overtimeRepository = new OvertimeRepository();

        super(overtimeRepository);

        this.overtimeRepository = overtimeRepository;
    }
}
