import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface PresenceBlueAttributes extends BaseAttributes {
    employee_id: number;
    req_man_id: number;
    presence: string;
    check_in?: Date;
    check_out?: Date;
    actual_check_in?: Date;
    actual_check_out?: Date;
    event_description?: Text;
    is_recapped_in_salary_slip?: boolean;
}

export class PresenceBlue extends BaseModel<PresenceBlueAttributes> {
    static associate(models: any) {
        PresenceBlue.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    PresenceBlue.init(
        {
            employee_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'employee',
                    key: 'pkid',
                },
            },
            req_man_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            presence: {
                allowNull: false,
                type: DataTypes.ENUM('Alfa', 'Izin', 'Hadir'),
            },
            check_in: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            check_out: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            actual_check_in: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            actual_check_out: {
                type: DataTypes.DATE,
            },
            event_description: {
                allowNull: true,
                type: DataTypes.TEXT,
            },
            is_recapped_in_salary_slip: {
                defaultValue: false,
                type: DataTypes.BOOLEAN,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'PresenceBlue',
            tableName: 'presence_blue',
            timestamps: false,
        },
    );

    return PresenceBlue;
}
