import { PTKPRepository } from '../../data-access/repositories/ptkp.repository';
import { PTKP } from '../../infrastructure/models/ptkp.model';
import { BaseService } from '../common/base.service';

export class PTKPService extends BaseService<PTKP> {
    private ptkpRepository: PTKPRepository;

    constructor() {
        const ptkpRepository = new PTKPRepository();

        super(ptkpRepository);

        this.ptkpRepository = ptkpRepository;
    }
}
