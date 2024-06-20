import { BaseRepository } from '../utility/base.repository';
import { Department } from '../../infrastructure/models/department.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class DepartmentRepository extends BaseRepository<Department> {
    constructor() {
        super(db.Department as ModelStatic<Department>);
    }
}