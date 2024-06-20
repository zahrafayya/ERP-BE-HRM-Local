import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface PTKPAttributes extends BaseAttributes {
    code: string;
    description: string;
    is_married: boolean;
    is_wife: boolean;
    tanggungan: number;
    ter_category?: string;
    amount: number;
    tunjangan_tetap?: number;
}

export class PTKP extends BaseModel<PTKPAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    PTKP.init(
        {
            code: {
                unique: true,
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            is_married: {
                type: DataTypes.BOOLEAN,
                unique: 'compositeIndex',
            },
            is_wife: {
              type: DataTypes.BOOLEAN,
              unique: 'compositeIndex',
            },
            tanggungan: {
                type: DataTypes.INTEGER,
                unique: 'compositeIndex',
            },
            ter_category: {
                allowNull: true,
                type: DataTypes.ENUM('A', 'B', 'C'),
            },
            amount: {
                type: DataTypes.BIGINT,
            },
            tunjangan_tetap: {
                type: DataTypes.BIGINT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'PTKP',
            tableName: 'ptkp',
            timestamps: false,
        },
    );

    return PTKP;
}
