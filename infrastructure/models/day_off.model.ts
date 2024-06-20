import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface DayOffAttributes extends BaseAttributes {
    date: Date;
}

export class DayOff extends BaseModel<DayOffAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    DayOff.init(
        {
            date: {
                type: DataTypes.DATE,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'DayOff',
            tableName: 'day_off',
            timestamps: false,
        },
    );

    return DayOff;
}
