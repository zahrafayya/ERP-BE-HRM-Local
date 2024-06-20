import { SalaryPercentageRepository } from '../../data-access/repositories/salary_percentage.repository';
import { SalaryPercentage } from '../../infrastructure/models/salary_percentage.model';
import { BaseService } from '../common/base.service';

export class SalaryPercentageService extends BaseService<SalaryPercentage> {
    private salaryPercentageRepository: SalaryPercentageRepository;

    constructor() {
        const salaryPercentageRepository = new SalaryPercentageRepository();

        super(salaryPercentageRepository);

        this.salaryPercentageRepository = salaryPercentageRepository;
    }
}
