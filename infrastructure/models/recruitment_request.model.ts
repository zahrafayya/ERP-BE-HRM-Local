import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface RecruitmentRequestAttributes extends BaseAttributes {
    position_id: number;
    description?: Text;
    needed_number: number;
    already_recruited?: number;
    status: string;
}

export class RecruitmentRequest extends BaseModel<RecruitmentRequestAttributes> {
    static associate(models: any) {
        RecruitmentRequest.belongsTo(models.Position, {
            foreignKey: 'position_id',
        });
        RecruitmentRequest.hasMany(models.Employee, {
            foreignKey: 'req_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    RecruitmentRequest.init(
        {
            position_id: {
                allowNull: true,
                type: DataTypes.BIGINT,
                references: {
                    model: 'position',
                    key: 'pkid',
                },
            },
            description: {
                type: DataTypes.TEXT,
            },
            needed_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('Open', 'Closed'),
                allowNull: false,
                defaultValue: 'Open',
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'RecruitmentRequest',
            tableName: 'recruitment_request',
            timestamps: false,
        },
    );

    return RecruitmentRequest;
}
