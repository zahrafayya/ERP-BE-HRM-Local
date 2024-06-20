import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface AmalAttributes extends BaseAttributes {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    amal_type: string;
    amal_amount: number;
}

export class Amal extends BaseModel<AmalAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Amal.init(
        {
            name: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            amal_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            amal_amount: {
                type: DataTypes.BIGINT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Amal',
            tableName: 'amal',
            timestamps: false,
        },
    );

    return Amal;
}
