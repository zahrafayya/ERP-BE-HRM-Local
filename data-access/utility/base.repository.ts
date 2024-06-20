import {CreationAttributes, Model, ModelStatic, UpdateOptions, WhereOptions, FindOptions, DestroyOptions  } from 'sequelize';
import {getMessage} from '../../helpers/messages/messagesUtil';
import {MessagesKey} from '../../helpers/messages/messagesKey';
import { Request } from 'express';
import { BaseAttributes } from '../../infrastructure/interfaces/base.model';
import { IncludeModelDTO } from '../../helpers/dtos/includeModel';

export abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;

    protected constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    //region Extract User Information
    protected extractGetInfo(req: Request, pkid?: number): WhereOptions<BaseAttributes> {
        const user = parseInt(req.headers['user'] as string ?? '0');
        const tenant = parseInt(req.headers['tenant'] as string ?? '0');
        const can_read_all = req.headers['can_read_all'] === 'true' ? true : false;

        let resultData = {};

        if (can_read_all) resultData = {...resultData, tenant: tenant, is_deleted: false};
        else resultData = {...resultData, created_by: user, is_deleted: false};
        
        if (pkid) resultData = {...resultData, pkid: pkid}

        return resultData;
    }

    protected extractCreationInfo(req: Request) {
        const user = parseInt(req.headers['user'] as string ?? '0');
        const tenant = parseInt(req.headers['tenant'] as string ?? '0');
        const host = req.ip ?? 'localhost';
        const currentTime = new Date();

        return {
            tenant: tenant,
            created_by: user,
            created_date: currentTime,
            created_host: host,
        };
    }

    protected extractUpdateInfo(req: Request) {
        const user = parseInt(req.headers['user'] as string ?? '0');
        const tenant = parseInt(req.headers['tenant'] as string ?? '0');
        const host = req.ip ?? 'localhost';
        const currentTime = new Date();

        return {
            tenant: tenant,
            updated_by: user,
            updated_date: currentTime,
            updated_host: host,
        };
    }

    protected extractDeleteInfo(req: Request) {
        const user = parseInt(req.headers['user'] as string ?? '0');
        const tenant = parseInt(req.headers['tenant'] as string ?? '0');
        const host = req.ip ?? 'localhost';
        const currentTime = new Date();

        return {
            tenant: tenant,
            is_deleted: true,
            deleted_by: user,
            deleted_date: currentTime,
            deleted_host: host,
        };
    }
    //endregion

    //region Find methods

    /**
     * Find all instances of the model.
     */
    async findAll(req: Request, include: IncludeModelDTO[] = []): Promise<T[]> {
        try {
            const getInfo = await this.extractGetInfo(req);

            return await this.model.findAll({
                where: getInfo,
                include: include
            });

            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }

    /**
     * Find an instance by its primary key ID.
     * @param req
     * @param pkid Primary key ID of the instance.
     */
    async findByID(req: Request, pkid: number, include: IncludeModelDTO[] = []): Promise<T | null> {
        try {
            const getInfo = await this.extractGetInfo(req, pkid);
    
            return await this.model.findOne({
                where: getInfo,
                include: include
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(getMessage(req, MessagesKey.ERRORFINDINGBYID) + ': ' + error.message);
            }
            throw error;
        }
    }

    /**
     * Find instances that match the given criteria, with optional ordering and limiting.
     * @param req The request object.
     * @param criteria The criteria to filter instances.
     * @param options Optional parameters for ordering and limiting the results.
     */
    async where(req: Request, criteria: WhereOptions<T['_attributes']>, include: IncludeModelDTO[] = [], options?: FindOptions<T['_attributes']>): Promise<T[]> {
        try {
            const getInfo: WhereOptions<T['_attributes']> = await this.extractGetInfo(req);

            return await this.model.findAll({
                where: {
                    ...criteria,
                    ...getInfo
                },
                include: include,
                ...options,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }

    /**
     * Check if an instance exists that matches the given criteria.
     * @param req
     * @param criteria
     */
    async whereExisting(req: Request, criteria: Partial<T['_attributes']>): Promise<boolean> {
        try {
            const whereCriteria: WhereOptions<T['_attributes']> = criteria as WhereOptions<T['_attributes']>;
            const getInfo: WhereOptions<T['_attributes']> = await this.extractGetInfo(req);
            
            const count = await this.model.count({
                where: {
                    ...whereCriteria,
                    ...getInfo
                },
            });

            return count > 0;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message);
            }
            throw error;
        }
    }

    //endregion

    //region Create methods

    async create(req: Request, entity: CreationAttributes<T>): Promise<T | string> {
        const creationInfo = await this.extractCreationInfo(req);
        try {
            return await this.model.create({
                ...entity,
                ...creationInfo,
            });
        } catch (error) {
            return getMessage(req, MessagesKey.ERRORCREATE);
        }
    }

    async bulkCreate(req: Request, entities: CreationAttributes<T>[]): Promise<T[] | string> {
        const creationInfo = await this.extractCreationInfo(req);
        try {
            return await this.model.bulkCreate(entities.map(entity => ({
                ...entity,
                ...creationInfo,
            })), {validate: true});
        } catch (error) {
            return getMessage(req, MessagesKey.ERRORBULKCREATE);
        }
    }

    //endregion

    //region Update methods

    async update(req: Request, pkid: number, entity: Partial<T['_attributes']>): Promise<[number, T[]]> {
        const updateInfo = await this.extractUpdateInfo(req);
        const [affectedCount] = await this.model.update({
            ...entity,
            ...updateInfo,
        }, {
            where: { pkid: pkid, tenant: updateInfo.tenant },
        } as UpdateOptions);
        return [affectedCount, []];
    }

    async bulkUpdate(req: Request, entities: { pkid: number; values: Partial<T['_attributes']>;}[]): Promise<void> {
        const transaction = await this.model.sequelize!.transaction();
        try {
            for (const entity of entities) {
                const updateInfo = await this.extractUpdateInfo(req);
                await this.model.update({
                    ...entity.values,
                    ...updateInfo,
                }, {
                    where: { pkid: entity.pkid, tenant: updateInfo.tenant },
                    transaction: transaction
                } as UpdateOptions);
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    //endregion

    //region Delete methods

    async softDelete(req: Request, pkid: number): Promise<boolean> {
        try {
            const deleteInfo = await this.extractDeleteInfo(req);

            await this.model.update({
                ...deleteInfo,
            }, {
                where: { pkid: pkid, tenant: deleteInfo.tenant },
            } as UpdateOptions);

            return true;
        } catch (error) {
            throw error;
        }
    }

    async delete(req: Request, pkid: number): Promise<boolean> {
        try {
            const deleteInfo = await this.extractDeleteInfo(req);

            const whereClause: DestroyOptions<any>['where'] = {
                pkid: pkid,
                tenant: deleteInfo.tenant
            };
    
            await this.model.destroy({ where: whereClause });

            return true;
        } catch (error) {
            throw error;
        }
    }

    //endregion
}
