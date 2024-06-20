import { EmployeeAttributes } from './employee.model';
import { PTKPAttributes } from './ptkp.model';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface BukpotAttributes extends BaseAttributes {
    employee_id: number;
    pemotong_id?: number;
    ptkp_id: number;
    year: number;
    gaji?: number;
    tunjangan_pph?: number;
    tunjangan_lain?: number;
    honorarium_imbalan?: number;
    premi_asuransi?: number;
    natura?: number;
    gratifikasi_thr?: number;
    biaya_jabatan_pensiun?: number;
    iuran_pensiun?: number;
    neto_sebelum?: number;
    pajak?: number;
    pajak_telah_dipotong?: number;
    pajak_lunas?: number;
    status: string;
    Employee?: EmployeeAttributes;
    PTKP?: PTKPAttributes;

}

export class Bukpot extends BaseModel<BukpotAttributes> {
    static associate(models: any) {
        Bukpot.belongsTo(models.Employee, {
            foreignKey: 'pemotong_id',
        });

        Bukpot.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
        });

        Bukpot.belongsTo(models.PTKP, {
            foreignKey: 'ptkp_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    Bukpot.init(
        {
            employee_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'employee',
                    key: 'pkid',
                },
            },
            pemotong_id: {
                allowNull: true,
                type: DataTypes.BIGINT,
                references: {
                    model: 'employee',
                    key: 'pkid',
                },
            },
            ptkp_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: 'ptkp',
                    key: 'pkid',
                },
            },
            year: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            gaji: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            tunjangan_pph: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            tunjangan_lain: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            honorarium_imbalan: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            premi_asuransi: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            natura: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            gratifikasi_thr: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            biaya_jabatan_pensiun: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            iuran_pensiun: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            neto_sebelum: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            pajak: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            pajak_telah_dipotong: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            pajak_lunas: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            status: {
                type: DataTypes.ENUM('Not Verified', 'Verified'),
                defaultValue: 'Not Verified',
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'Bukpot',
            tableName: 'bukpot',
            timestamps: false,
        },
    );

    return Bukpot;
}
