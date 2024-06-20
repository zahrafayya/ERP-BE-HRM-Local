import { AllowanceNameAttributes } from './allowance_name.model';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface AllowanceAttributes extends BaseAttributes {
    ss_id: number;
    allowance_name_id: number;
    amount: number;
    AllowanceName?: AllowanceNameAttributes;
}

export class Allowance extends BaseModel<AllowanceAttributes> {
    static associate(models: any) {
        Allowance.belongsTo(models.SalarySlip, {
            foreignKey: 'ss_id',
        });

        Allowance.belongsTo(models.AllowanceName, {
            foreignKey: 'allowance_name_id',
        });
    }
}

module.exports = (sequelize: any, DataTypes: any) => {
    Allowance.init(
        {
            ss_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'salary_slip',
                    key: 'pkid',
                },
            },
            allowance_name_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'allowance_name',
                    key: 'pkid',
                },
            },
            amount: {
                allowNull: false,
                type: DataTypes.DOUBLE,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Allowance',
            tableName: 'allowance',
            timestamps: false,
        },
    );

    return Allowance;
}
