import { DepartmentRepository } from '../../data-access/repositories/department.repository';
import { Department } from '../../infrastructure/models/department.model';
import { BaseService } from '../common/base.service';

export class DepartmentService extends BaseService<Department> {
    private departmentRepository: DepartmentRepository;

    constructor() {
        const departmentRepository = new DepartmentRepository();

        super(departmentRepository);

        this.departmentRepository = departmentRepository;
    }
}
