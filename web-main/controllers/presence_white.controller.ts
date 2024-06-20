import { Request, Response } from 'express';
import { PresenceWhiteService } from '../../business-layer/services/presence_white.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { generatePresenceWhiteId } from '../../helpers/utils/generateId';
import { CountPresenceWhiteInputVM } from '../../helpers/view-models/presence_white.vm';

export class PresenceWhiteController extends BaseController {
    private PresenceWhiteService: PresenceWhiteService;

    constructor() {
        super();
        this.PresenceWhiteService = new PresenceWhiteService();
    }

    /**
     * Handles request to get all PresenceWhites.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_white');

            const PresenceWhites = await this.PresenceWhiteService.findAll(req);
            if (PresenceWhites && PresenceWhites.length > 0) {
                return this.sendSuccessGet(req, res, PresenceWhites, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a PresenceWhite by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_white');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const PresenceWhite = await this.PresenceWhiteService.findByPKID(req, id);
            if (PresenceWhite) {
                return this.sendSuccessGet(req, res, PresenceWhite, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_white');

            // req.body['pkid'] = generatePresenceWhiteId();

            const result = await this.PresenceWhiteService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async count(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_white');

            const reqData = new CountPresenceWhiteInputVM(req.body);

            const result = await this.PresenceWhiteService.countPresenceWhite(req, reqData);
            return this.sendSuccessGet(req, res, result, MessagesKey.SUCCESSGET, 200);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'presence_white');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.PresenceWhiteService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'presence_white');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            
            await this.PresenceWhiteService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }
}
