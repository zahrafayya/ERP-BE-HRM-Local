import { DataTypes, Model } from 'sequelize';

export interface BaseAttributes {
    pkid?: number;
    tenant?: number;
    created_by?: number;
    created_date?: Date;
    created_host?: string;
    updated_by?: string;
    updated_date?: Date;
    updated_host?: string;
    is_deleted?: boolean;
    deleted_by?: string;
    deleted_date?: Date;
    deleted_host?: string;
}

export abstract class BaseModel<T extends BaseAttributes> extends Model<T> {

    static initBaseAttributes() {
        return {
            pkid: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true,
            },
            tenant: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            created_by: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            created_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            created_host: {
                type: DataTypes.STRING,
                allowNull: true
            },
            updated_by: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            updated_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updated_host: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            deleted_by: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            deleted_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            deleted_host: {
                type: DataTypes.STRING,
                allowNull: true
            }
        };
    }
}