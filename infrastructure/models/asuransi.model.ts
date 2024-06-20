import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface AsuransiAttributes extends BaseAttributes {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    asuransi_type: string;
    asuransi_amount: number;
}

export class Asuransi extends BaseModel<AsuransiAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Asuransi.init(
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
            asuransi_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            asuransi_amount: {
                type: DataTypes.FLOAT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Asuransi',
            tableName: 'asuransi',
            timestamps: false,
        },
    );

    return Asuransi;
}
