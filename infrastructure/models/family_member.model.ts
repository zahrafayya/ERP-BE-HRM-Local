import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface FamilyMemberAttributes extends BaseAttributes {
    nik?: string;
    employee_id: number;
    name: string;
    role: string;
    date_of_birth?: Date;
    education?: string;
    is_working: boolean;
    bukti_tidak_kerja?: string;
}

export class FamilyMember extends BaseModel<FamilyMemberAttributes> {
    static associate(models: any) {
        FamilyMember.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    FamilyMember.init(
        {
            nik: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            employee_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'employee',
                    key: 'pkid',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(
                    'Istri', 
                    'Suami',
                    'Ayah',
                    'Ibu',
                    'Ayah Mertua',
                    'Ibu Mertua',
                    'Anak Kandung Perempuan',
                    'Anak Kandung Laki-laki',
                    'Anak Angkat Perempuan',
                    'Anak Angkat Laki-laki', 
                ),
                allowNull: false,
            },
            date_of_birth: {
                type: DataTypes.DATE,
            },
            education: {
                type: DataTypes.STRING,
            },
            is_working: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            bukti_tidak_kerja: DataTypes.STRING,
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'FamilyMember',
            tableName: 'family_member',
            timestamps: false,
        },
    );

    return FamilyMember;
}
