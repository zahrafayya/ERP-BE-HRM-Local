import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface TerPPHAttributes extends BaseAttributes {
    code: string;
    ter_category: string;
    income_min?: number;
    income_max?: number;
    ter_pct?: number;
}

export class TerPPH extends BaseModel<TerPPHAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    TerPPH.init(
        {
            code: {
                type: DataTypes.STRING,
            },
            ter_category: {
                allowNull: false,
                type: DataTypes.ENUM('A', 'B', 'C'),
            },
            income_min: {
                type: DataTypes.BIGINT,
            },
            income_max: {
                type: DataTypes.BIGINT,
            },
            ter_pct: {
                type: DataTypes.FLOAT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'TerPPH',
            tableName: 'ter_pph',
            timestamps: false,
        },
    );

    return TerPPH;
}
