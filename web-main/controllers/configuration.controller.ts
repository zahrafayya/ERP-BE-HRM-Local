import { Request, Response } from 'express';
import { ConfigurationService } from '../../business-layer/services/configuration.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { defaultConfiguration } from '../../data-access/utility/defaultData';

export class ConfigurationController extends BaseController {
    private ConfigurationService: ConfigurationService;

    constructor() {
        super();
        this.ConfigurationService = new ConfigurationService();
    }

    /**
     * Handles request to find a Configuration by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'configuration');

            const Configuration = await this.ConfigurationService.findAll(req);
            if (Configuration.length !== 0) {
                return this.sendSuccessGet(req, res, Configuration[0], MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                const Configuration = await this.ConfigurationService.create(req, defaultConfiguration);

                if (typeof Configuration == 'string') {
                    return this.sendErrorBadRequest(req, res);
                }
                return this.sendSuccessGet(req, res, Configuration, MessagesKey.SUCCESSGETBYID, 200, true);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'configuration');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.ConfigurationService.update(req, id, data);
            if (pr) {
                return this.sendSuccessUpdate(req, res, pr, id);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }
}
