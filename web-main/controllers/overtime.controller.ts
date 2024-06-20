import { Request, Response } from 'express';
import { OvertimeService } from '../../business-layer/services/overtime.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { OvertimeAttributes } from '../../infrastructure/models/overtime.model';

export class OvertimeController extends BaseController {
    private OvertimeService: OvertimeService;

    constructor() {
        super();
        this.OvertimeService = new OvertimeService();
    }

    /**
     * Handles request to get all Overtimes.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'overtime');

            const Overtimes = await this.OvertimeService.findAll(req);
            if (Overtimes && Overtimes.length > 0) {
                return this.sendSuccessGet(req, res, Overtimes, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Overtime by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'overtime');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const Overtime = await this.OvertimeService.findByPKID(req, id);
            if (Overtime) {
                return this.sendSuccessGet(req, res, Overtime, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'overtime');

            const arr = req.body;

            let result: any;
            await arr.map(async (item: OvertimeAttributes) => {
                result = await this.OvertimeService.create(req, item);
            })
            
            return this.sendSuccessCreate(req, res, result);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'overtime');

            const arr = req.body;

            let result: any;
            await arr.map(async (item: OvertimeAttributes) => {
                if (item.pkid === undefined) {
                    return res.status(400).send('Invalid FamilyMember ID');
                }
                result = await this.OvertimeService.update(req, item.pkid, item)
            });

            return this.sendSuccessUpdate(req, res, result);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'overtime');

            const arr = req.body;

            await arr.map(async (id: number) => {
                await this.OvertimeService.delete(req, id);
            });
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
