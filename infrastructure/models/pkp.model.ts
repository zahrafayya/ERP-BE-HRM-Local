import {  Model } from 'sequelize';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface PKPAttributes extends BaseAttributes {
    pkp_min: number;
    pkp_max: number;
    tariff_percentage: number;
}

export class PKP extends BaseModel<PKPAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    PKP.init(
        {
            pkp_min: {
                type: DataTypes.BIGINT,
            },
            pkp_max: {
                type: DataTypes.BIGINT,
            },
            tariff_percentage: {
                type: DataTypes.FLOAT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'PKP',
            tableName: 'pkp',
            timestamps: false,
        },
    );

    return PKP;
}
