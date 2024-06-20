import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface PositionAttributes extends BaseAttributes {
    department_id: number;
    name: string;
    description?: Text;
    type: string;
    blue_cost_ph?: number;
    white_payroll_id?: number;
    white_is_pemotong_bukpot?: boolean;
    working_hour_per_week?: number;
    tunjangan_tetap?: number;
}

export class Position extends BaseModel<PositionAttributes> {
    static associate(models: any) {
        Position.belongsTo(models.Department, {
            foreignKey: 'department_id',
        });

        Position.belongsTo(models.WhitePayroll, {
            foreignKey: 'white_payroll_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Position.init(
        {
            department_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'department',
                    key: 'pkid',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            type: {
                type: DataTypes.ENUM('Blue', 'White'),
                allowNull: false
            },
            white_payroll_id: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'white_payroll',
                    key: 'pkid',
                },
            },
            white_is_pemotong_bukpot: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            blue_cost_ph: {
                type: DataTypes.FLOAT,
            },
            tunjangan_tetap: {
                type: DataTypes.BIGINT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Position',
            tableName: 'position',
            timestamps: false,
        },
    );

    return Position;
}
