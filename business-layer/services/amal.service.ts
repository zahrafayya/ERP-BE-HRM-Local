import { AmalRepository } from '../../data-access/repositories/amal.repository';
import { Amal } from '../../infrastructure/models/amal.model';
import { BaseService } from '../common/base.service';

export class AmalService extends BaseService<Amal> {
    private amalRepository: AmalRepository;

    constructor() {
        const amalRepository = new AmalRepository();

        super(amalRepository);

        this.amalRepository = amalRepository;
    }
}
