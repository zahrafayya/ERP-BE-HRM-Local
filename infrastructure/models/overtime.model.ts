import {  Model } from 'sequelize';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface OvertimeAttributes extends BaseAttributes {
    type: string;
    jam_pertama: number;
    overtime_rate_ph: number;
    overtime_rate_type?: string;
}

export class Overtime extends BaseModel<OvertimeAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Overtime.init(
        {
            type: {
                type: DataTypes.ENUM('Hari kerja', 'Hari libur', 'Hari libur nasional'),
            },
            jam_pertama: {
                type: DataTypes.INTEGER,
            },
            overtime_rate_ph: {
                type: DataTypes.FLOAT,
            },
            overtime_rate_type: {
                type: DataTypes.ENUM('Alfa', 'Nominal', 'Percentage'),
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Overtime',
            tableName: 'Overtime',
            timestamps: false,
        },
    );

    return Overtime;
}
