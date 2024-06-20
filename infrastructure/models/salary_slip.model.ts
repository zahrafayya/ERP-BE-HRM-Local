import { EmployeeAttributes } from './employee.model';
import { AllowanceAttributes } from './allowance.model';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface SalarySlipAttributes extends BaseAttributes {
    employee_id: number;
    gaji_pokok?: number;
    gaji_lembur?: number;
    penalti?: number;
    tunjangan_jabatan?: number;
    tunjangan_keluarga?: number;
    deduction_asuransi_pribadi?: number;
    deduction_amal?: number;
    deduction_bpjs_kesehatan?: number;
    deduction_bpjs_tk_jht?: number;
    deduction_bpjs_tk_jp?: number;
    deduction_pph21?: number;
    benefit_bpjs_kesehatan?: number;
    benefit_bpjs_tk_jht?: number;
    benefit_bpjs_tk_jkk?: number;
    benefit_bpjs_tk_jkm?: number;
    benefit_bpjs_tk_jp?: number;
    gaji_take_home?: number;
    status: string;
    year: number;
    month: string;
    start_date: Date;
    last_date: Date;
    Employee?: EmployeeAttributes;
    Allowances?: AllowanceAttributes[];
}

export class SalarySlip extends BaseModel<SalarySlipAttributes> {
    static associate(models: any) {
        SalarySlip.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
        });

        SalarySlip.hasMany(models.Allowance, {
            foreignKey: 'ss_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    SalarySlip.init(
        {
            employee_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'employee',
                    key: 'pkid',
                },
            },
            gaji_pokok: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            gaji_lembur: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            penalti: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },

            deduction_asuransi_pribadi: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            deduction_amal: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            deduction_bpjs_kesehatan: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            tunjangan_jabatan: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            tunjangan_keluarga: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            deduction_bpjs_tk_jht: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            deduction_bpjs_tk_jp: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            deduction_pph21: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            
            benefit_bpjs_kesehatan: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            benefit_bpjs_tk_jht: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            benefit_bpjs_tk_jkk: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            benefit_bpjs_tk_jkm: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            benefit_bpjs_tk_jp: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            gaji_take_home: {
                defaultValue: 0,
                type: DataTypes.DOUBLE,
            },
            status: {
                type: DataTypes.ENUM('Not Written In Journal', 'Written In Journal', 'Paid'),
                defaultValue: 'Not Written In Journal',
            },
            year: {
                type: DataTypes.INTEGER
            },
            month: {
                type: DataTypes.ENUM('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember')
            },
            start_date: {
                type: DataTypes.DATE,
            },
            last_date: {
                type: DataTypes.DATE,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'SalarySlip',
            tableName: 'salary_slip',
            timestamps: false,
        },
    );

    return SalarySlip;
}
