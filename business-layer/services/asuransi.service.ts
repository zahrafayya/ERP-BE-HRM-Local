import { AsuransiRepository } from '../../data-access/repositories/asuransi.repository';
import { Asuransi } from '../../infrastructure/models/asuransi.model';
import { BaseService } from '../common/base.service';

export class AsuransiService extends BaseService<Asuransi> {
    private asuransiRepository: AsuransiRepository;

    constructor() {
        const asuransiRepository = new AsuransiRepository();

        super(asuransiRepository);

        this.asuransiRepository = asuransiRepository;
    }
}
