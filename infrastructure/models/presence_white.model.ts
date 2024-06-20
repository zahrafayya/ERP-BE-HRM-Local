import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface PresenceWhiteAttributes extends BaseAttributes {
    employee_id: number;
    presence: string;
    date?: Date;
    check_in?: Date;
    check_out?: Date;
    event_description?: Text;
}

export class PresenceWhite extends BaseModel<PresenceWhiteAttributes> {
    static associate(models: any) {
        PresenceWhite.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    PresenceWhite.init(
        {
            employee_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'employee',
                    key: 'pkid',
                },
            },
            presence: {
                allowNull: false,
                type: DataTypes.ENUM('Izin', 'Hadir'),
            },
            date: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            check_in: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            check_out: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            event_description: {
                allowNull: true,
                type: DataTypes.TEXT,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'PresenceWhite',
            tableName: 'presence_white',
            timestamps: false,
        },
    );

    return PresenceWhite;
}
