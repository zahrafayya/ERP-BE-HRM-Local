import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface AllowanceNameAttributes extends BaseAttributes {
    name: string;
    type: string;
}

export class AllowanceName extends BaseModel<AllowanceNameAttributes> {
    static associate(models: any) {}
}

module.exports = (sequelize: any, DataTypes: any) => {
    AllowanceName.init(
        {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            type: {
                allowNull: false,
                type: DataTypes.ENUM(
                    'Tunjangan PPh',
                    'Honorarium',
                    'Natura',
                    'Bonus'
                )
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'AllowanceName',
            tableName: 'allowance_name',
            timestamps: false,
        },
    );

    return AllowanceName;
}
