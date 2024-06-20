import { AllowanceNameRepository } from '../../data-access/repositories/allowance_name.repository';
import { AllowanceName } from '../../infrastructure/models/allowance_name.model';
import { BaseService } from '../common/base.service';

export class AllowanceNameService extends BaseService<AllowanceName> {
    private allowanceNameRepository: AllowanceNameRepository;

    constructor() {
        const allowanceNameRepository = new AllowanceNameRepository();

        super(allowanceNameRepository);

        this.allowanceNameRepository = allowanceNameRepository;
    }
}
