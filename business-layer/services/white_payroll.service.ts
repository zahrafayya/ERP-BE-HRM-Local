import { WhitePayrollRepository } from '../../data-access/repositories/white_payroll.repository';
import { WhitePayroll } from '../../infrastructure/models/white_payroll.model';
import { BaseService } from '../common/base.service';

export class WhitePayrollService extends BaseService<WhitePayroll> {
    private whitePayrollRepository: WhitePayrollRepository;

    constructor() {
        const whitePayrollRepository = new WhitePayrollRepository();

        super(whitePayrollRepository);

        this.whitePayrollRepository = whitePayrollRepository;
    }
}
