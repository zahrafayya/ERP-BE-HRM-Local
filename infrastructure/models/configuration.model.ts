import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface ConfigurationAttributes extends BaseAttributes {
    white_start_time: string;
    white_work_duration: string;
    white_working_days_per_week: number;
    white_is_penalty_given: boolean;
    white_late_time_tolerance?: string;
    white_late_salary_penalty_ph?: number;
    white_late_salary_penalty_type?: string;
    blue_is_penalty_given: boolean;
    blue_late_time_tolerance?: string;
    blue_late_salary_penalty_ph?: number;
    blue_late_salary_penalty_type?: string;
}

export class Configuration extends BaseModel<ConfigurationAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Configuration.init(
        {
            white_start_time: {
                type: DataTypes.TIME,
            },
            white_work_duration: {
                type: DataTypes.TIME,
            },
            white_working_days_per_week: {
                type: DataTypes.BIGINT,
            },
            white_is_penalty_given: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            white_late_time_tolerance:{
                allowNull: true,
                type: DataTypes.TIME,
            },
            white_late_salary_penalty_ph:{
                allowNull: true,
                type: DataTypes.FLOAT,
            },
            white_late_salary_penalty_type:{
                allowNull: true,
                type: DataTypes.ENUM('Percentage', 'Nominal'),
            },
            blue_is_penalty_given: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            blue_late_time_tolerance:{
                allowNull: true,
                type: DataTypes.TIME,
            },
            blue_late_salary_penalty_ph:{
                allowNull: true,
                type: DataTypes.FLOAT,
            },
            blue_late_salary_penalty_type:{
                allowNull: true,
                type: DataTypes.ENUM('Percentage', 'Nominal'),
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Configuration',
            tableName: 'configuration',
            timestamps: false,
        },
    );

    return Configuration;
}
