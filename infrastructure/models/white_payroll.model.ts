import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface WhitePayrollAttributes extends BaseAttributes {
    nama_golongan: string;
    tahun_0: number;
    tahun_1: number;
    tahun_2: number;
    tahun_3: number;
    tahun_4: number;
    tahun_5: number;
    tahun_6: number;
    tahun_7: number;
    tahun_8: number;
    tahun_9: number;
    tahun_10: number;
    tahun_11: number;
    tahun_12: number;
    tahun_13: number;
    tahun_14: number;
    tahun_15: number;
    tahun_16: number;
    tahun_17: number;
    tahun_18: number;
    tahun_19: number;
    tahun_20: number;
    tahun_21: number;
    tahun_22: number;
    tahun_23: number;
    tahun_24: number;
    tahun_25: number;
    tahun_26: number;
    tahun_27: number;
    tahun_28: number;
    tahun_29: number;
    tahun_30: number;
    tahun_31: number;
    tahun_32: number;
    tahun_33: number;
}

export class WhitePayroll extends BaseModel<WhitePayrollAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    WhitePayroll.init(
        {
            nama_golongan: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            tahun_0: {
                type: DataTypes.INTEGER,
            },
            tahun_1: {
                type: DataTypes.INTEGER,
            },
            tahun_2: {
                type: DataTypes.INTEGER,
            },
            tahun_3: {
                type: DataTypes.INTEGER,
            },
            tahun_4: {
                type: DataTypes.INTEGER,
            },
            tahun_5: {
                type: DataTypes.INTEGER,
            },
            tahun_6: {
                type: DataTypes.INTEGER,
            },
            tahun_7: {
                type: DataTypes.INTEGER,
            },
            tahun_8: {
                type: DataTypes.INTEGER,
            },
            tahun_9: {
                type: DataTypes.INTEGER,
            },
            tahun_10: {
                type: DataTypes.INTEGER,
            },
            tahun_11: {
                type: DataTypes.INTEGER,
            },
            tahun_12: {
                type: DataTypes.INTEGER,
            },
            tahun_13: {
                type: DataTypes.INTEGER,
            },
            tahun_14: {
                type: DataTypes.INTEGER,
            },
            tahun_15: {
                type: DataTypes.INTEGER,
            },
            tahun_16: {
                type: DataTypes.INTEGER,
            },
            tahun_17: {
                type: DataTypes.INTEGER,
            },
            tahun_18: {
                type: DataTypes.INTEGER,
            },
            tahun_19: {
                type: DataTypes.INTEGER,
            },
            tahun_20: {
                type: DataTypes.INTEGER,
            },
            tahun_21: {
                type: DataTypes.INTEGER,
            },
            tahun_22: {
                type: DataTypes.INTEGER,
            },
            tahun_23: {
                type: DataTypes.INTEGER,
            },
            tahun_24: {
                type: DataTypes.INTEGER,
            },
            tahun_25: {
                type: DataTypes.INTEGER,
            },
            tahun_26: {
                type: DataTypes.INTEGER,
            },
            tahun_27: {
                type: DataTypes.INTEGER,
            },
            tahun_28: {
                type: DataTypes.INTEGER,
            },
            tahun_29: {
                type: DataTypes.INTEGER,
            },
            tahun_30: {
                type: DataTypes.INTEGER,
            },
            tahun_31: {
                type: DataTypes.INTEGER,
            },
            tahun_32: {
                type: DataTypes.INTEGER,
            },
            tahun_33: {
                type: DataTypes.INTEGER,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'WhitePayroll',
            tableName: 'white_payroll',
            timestamps: false,
        },
    );

    return WhitePayroll;
}
