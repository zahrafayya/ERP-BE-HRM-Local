import { EmployeeAttributes } from './employee.model';
import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface BukpotBlueAttributes extends BaseAttributes {
    employee_id: number;
    pemotong_id?: number;
    month: string;
    year: number;
    gaji?: number;
    penghasilan_bruto?: number;
    tarif?: number;
    pph_dipotong?: number;
    status: string;
    Employee?: EmployeeAttributes;

}

export class BukpotBlue extends BaseModel<BukpotBlueAttributes> {
    static associate(models: any) {
        BukpotBlue.belongsTo(models.Employee, {
            foreignKey: 'pemotong_id',
        });

        BukpotBlue.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
        });
    }
}

module.exports =  (sequelize: any, DataTypes: any) => {
    BukpotBlue.init(
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
            month: {
                allowNull: false,
                type: DataTypes.ENUM('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember')
            },
            year: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            penghasilan_bruto: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            tarif: {
                type: DataTypes.DOUBLE,
                defaultValue: 0.0,
            },
            pph_dipotong: {
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
            modelName: 'BukpotBlue',
            tableName: 'bukpot_blue',
            timestamps: false,
        },
    );

    return BukpotBlue;
}
