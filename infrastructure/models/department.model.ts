import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface DepartmentAttributes extends BaseAttributes {
    name: string;
    description?: string;
}

export class Department extends BaseModel<DepartmentAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Department.init(
        {
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Department',
            tableName: 'department',
            timestamps: false,
        },
    );

    return Department;
}
