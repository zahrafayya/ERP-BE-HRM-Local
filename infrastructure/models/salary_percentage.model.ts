import { BaseModel, BaseAttributes } from '../interfaces/base.model';

export interface SalaryPercentageAttributes extends BaseAttributes {
    bpjs_kesehatan_type: string;
    bpjs_kesehatan_perusahaan: number;
    // bpjs_kesehatan_perusahaan_percentage_max?: number;
    bpjs_kesehatan_pribadi: number;
    // bpjs_kesehatan_pribadi_percentage_max?: number;
    is_adding_bpjs_kesehatan: boolean;
    bpjs_ketenagakerjaan_jht_type: string;
    bpjs_ketenagakerjaan_jht_perusahaan: number;
    // bpjs_ketenagakerjaan_jht_perusahaan_percentage_max?: number;
    bpjs_ketenagakerjaan_jht_pribadi: number;
    // bpjs_ketenagakerjaan_jht_pribadi_percentage_max?: number;
    is_adding_bpjs_ketenagakerjaan_jht: boolean;
    bpjs_ketenagakerjaan_jkk_type: string;
    bpjs_ketenagakerjaan_jkk_perusahaan: number;
    // bpjs_ketenagakerjaan_jkk_perusahaan_percentage_max?: number;
    is_adding_bpjs_ketenagakerjaan_jkk: boolean;
    bpjs_ketenagakerjaan_jkm_type: string;
    bpjs_ketenagakerjaan_jkm_perusahaan: number;
    // bpjs_ketenagakerjaan_jkm_perusahaan_percentage_max?: number;
    is_adding_bpjs_ketenagakerjaan_jkm: boolean;
    bpjs_ketenagakerjaan_jp_type: string;
    bpjs_ketenagakerjaan_jp_perusahaan: number;
    // bpjs_ketenagakerjaan_jp_perusahaan_percentage_max?: number;
    bpjs_ketenagakerjaan_jp_pribadi: number;
    // bpjs_ketenagakerjaan_jp_pribadi_percentage_max?: number;
    is_adding_bpjs_ketenagakerjaan_jp: boolean;
}

export class SalaryPercentage extends BaseModel<SalaryPercentageAttributes> {
    static associate(models: any) {}
}

module.exports =  (sequelize: any, DataTypes: any) => {
    SalaryPercentage.init(
        {
            bpjs_kesehatan_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            bpjs_kesehatan_perusahaan: {
                type: DataTypes.FLOAT,
            },
            // bpjs_kesehatan_perusahaan_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            bpjs_kesehatan_pribadi: {
                type: DataTypes.FLOAT,
            },
            // bpjs_kesehatan_pribadi_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            is_adding_bpjs_kesehatan: {
                type: DataTypes.BOOLEAN,
            },
            bpjs_ketenagakerjaan_jht_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            bpjs_ketenagakerjaan_jht_perusahaan: {
                type: DataTypes.FLOAT,
            },
            // bpjs_ketenagakerjaan_jht_perusahaan_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            bpjs_ketenagakerjaan_jht_pribadi: {
                type: DataTypes.FLOAT,
            },
            // bpjs_ketenagakerjaan_jht_pribadi_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            is_adding_bpjs_ketenagakerjaan_jht: {
                type: DataTypes.BOOLEAN,
            },
            bpjs_ketenagakerjaan_jkk_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            bpjs_ketenagakerjaan_jkk_perusahaan: {
                type: DataTypes.FLOAT,
            },
            // bpjs_ketenagakerjaan_jkk_perusahaan_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            is_adding_bpjs_ketenagakerjaan_jkk: {
                type: DataTypes.BOOLEAN,
            },
            bpjs_ketenagakerjaan_jkm_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            bpjs_ketenagakerjaan_jkm_perusahaan: {
                type: DataTypes.FLOAT,
            },
            // bpjs_ketenagakerjaan_jkm_perusahaan_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            is_adding_bpjs_ketenagakerjaan_jkm: {
                type: DataTypes.BOOLEAN,
            },
            bpjs_ketenagakerjaan_jp_type: {
                type: DataTypes.ENUM('Nominal', 'Percentage'),
            },
            bpjs_ketenagakerjaan_jp_perusahaan: {
                type: DataTypes.FLOAT,
            },
            // bpjs_ketenagakerjaan_jp_perusahaan_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            bpjs_ketenagakerjaan_jp_pribadi: {
                type: DataTypes.FLOAT,
            },
            // bpjs_ketenagakerjaan_jp_pribadi_percentage_max: {
            //     type: DataTypes.FLOAT,
            // },
            is_adding_bpjs_ketenagakerjaan_jp: {
                type: DataTypes.BOOLEAN,
            },
            ...BaseModel.initBaseAttributes(),
        },
        {
            sequelize,
            modelName: 'SalaryPercentage',
            tableName: 'salary_percentage',
            timestamps: false,
        },
    );

    return SalaryPercentage;
}
