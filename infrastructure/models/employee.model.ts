import { PTKPAttributes } from './ptkp.model';
import { PositionAttributes } from './position.model';
import { AsuransiAttributes } from './asuransi.model';
import { AmalAttributes } from './amal.model';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface EmployeeAttributes extends BaseAttributes {
    user_id: number;
    req_id: number;
    position_id: number;
    ptkp_id?: number;
    updated_ptkp_id?: number;
    updated_ptkp_year?: number;
    updated_ptkp_status?: string;
    updated_ptkp_issue?: string;
    amal_id?: number;
    asuransi_id?: number;
    email: string;
    nip?: string;
    npwp?: string;
    nik?: string;
    fullname?: string;
    gender?: string;
    address?: string;
    phone?: string;
    country_code?: string;
    education?: string;
    signature_url?: string;
    kartu_keluarga_url?: string;
    verification_state: string;
    verification_issue?: string;
    active_status: string;
    inactive_since?: Date;
    join_date: Date;
    Position?: PositionAttributes;
    PTKP?: PTKPAttributes;
    Asuransi?: AsuransiAttributes;
    Amal?: AmalAttributes;
}

export class Employee extends BaseModel<EmployeeAttributes> {
    static associate(models: any) {
        Employee.belongsTo(models.PTKP, {
            foreignKey: 'ptkp_id',
        });

        Employee.belongsTo(models.Position, {
            foreignKey: 'position_id',
        });

        Employee.belongsTo(models.RecruitmentRequest, {
            foreignKey: 'req_id',
        });

        Employee.hasMany(models.FamilyMember, {
            foreignKey: 'employee_id',
        });

        Employee.hasMany(models.Bukpot, {
            foreignKey: 'employee_id',
        });

        Employee.hasMany(models.Bukpot, {
            foreignKey: 'pemotong_id',
        });

        Employee.hasMany(models.SalarySlip, {
            foreignKey: 'employee_id',
        });

        Employee.belongsTo(models.Amal, {
            foreignKey: 'amal_id',
        });

        Employee.belongsTo(models.Asuransi, {
            foreignKey: 'asuransi_id',
        });
    }
}

module.exports = (sequelize: any, DataTypes: any) => {
    Employee.init(
        {
            user_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                unique: true,
            },

            req_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'recruitment_request',
                    key: 'pkid',
                },
            },

            position_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'position',
                    key: 'pkid',
                },
            },

            ptkp_id: {
                allowNull: true,
                type: DataTypes.BIGINT,
                references: {
                    model: 'ptkp',
                    key: 'pkid',
                },
            },
            updated_ptkp_id: {
                allowNull: true,
                type: DataTypes.BIGINT,
            },
            updated_ptkp_status: {
                type: DataTypes.ENUM('Tidak ada pengajuan', 'Diajukan', 'Ada isu', 'Terverifikasi'),
                defaultValue: 'Tidak ada pengajuan',
            },
            updated_ptkp_year: DataTypes.INTEGER,
            updated_ptkp_issue: DataTypes.STRING,
            amal_id: {
                allowNull: true,
                type: DataTypes.BIGINT,
                references: {
                    model: 'amal',
                    key: 'pkid',
                },
            },
            asuransi_id: {
                allowNull: true,
                type: DataTypes.BIGINT,
                references: {
                    model: 'asuransi',
                    key: 'pkid',
                },
            },


            // Data Penting
            email: DataTypes.STRING,
            nip: DataTypes.STRING,
            npwp: DataTypes.STRING, // Nomor Pokok Wajib Pajak
            nik: DataTypes.STRING, // Nomor Induk Kependudukan
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gender: {
                type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
                allowNull: false,
            },
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            country_code: {
                type: DataTypes.STRING,
            },
            education: {
                type: DataTypes.ENUM(
                    'Tidak sekolah', 
                    'SD',
                    'SMP',
                    'SMA/SMK',
                    'D1/D2',
                    'D3',
                    'S1',
                    'S2',
                    'S3'
                ),
            },
            signature_url: DataTypes.STRING,
            kartu_keluarga_url: DataTypes.STRING,
            verification_state: {
                type: DataTypes.ENUM('Belum diajukan', 'Diajukan', 'Ada isu', 'Terverifikasi'),
                defaultValue: 'Belum diajukan',
            },
            verification_issue: DataTypes.STRING,
            active_status: {
                type: DataTypes.ENUM('Aktif', 'Cuti', 'Putus Kerja'),
                defaultValue: 'Aktif',
            },
            inactive_since: {
                type: DataTypes.DATE
            },
            join_date: DataTypes.DATE,
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Employee',
            tableName: 'employee',
            timestamps: false,
        },
    );

    return Employee;
}
