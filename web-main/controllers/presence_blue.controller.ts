import { Request, Response } from 'express';
import { PresenceBlueService } from '../../business-layer/services/presence_blue.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { CountHourPresenceBlueInputVM } from '../../helpers/view-models/presence_blue.vm';

export class PresenceBlueController extends BaseController {
    private PresenceBlueService: PresenceBlueService;

    constructor() {
        super();
        this.PresenceBlueService = new PresenceBlueService();
    }

    /**
     * Handles request to get all PresenceBlues.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_blue');

            const PresenceBlues = await this.PresenceBlueService.findAll(req);
            if (PresenceBlues && PresenceBlues.length > 0) {
                return this.sendSuccessGet(req, res, PresenceBlues, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a PresenceBlue by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_blue');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const PresenceBlue = await this.PresenceBlueService.findByPKID(req, id);
            if (PresenceBlue) {
                return this.sendSuccessGet(req, res, PresenceBlue, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async countHour(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_blue');

            const inputData = new CountHourPresenceBlueInputVM(req.body);

            const newWorkcentre = await this.PresenceBlueService.countHourPresenceBlue(req, inputData);
            return this.sendSuccessCreate(req, res, newWorkcentre);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_blue');

            // req.body['pkid'] = generatePresenceBlueId();

            const result = await this.PresenceBlueService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_blue');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.PresenceBlueService.update(req, id, data);
            if (pr) {
                return this.sendSuccessUpdate(req, res, pr, id);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_blue');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            
            await this.PresenceBlueService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
