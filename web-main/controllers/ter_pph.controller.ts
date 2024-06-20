import { Request, Response } from 'express';
import { TerPPHService } from '../../business-layer/services/ter_pph.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { GetTerPPhByIncomeInputVM } from '../../helpers/view-models/ter_pph.vm';

export class TerPPHController extends BaseController {
    private TerPPHService: TerPPHService;

    constructor() {
        super();
        this.TerPPHService = new TerPPHService();
    }

    /**
     * Handles request to get all TerPPHs.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ter_pph');

            const TerPPHs = await this.TerPPHService.findAll(req);
            if (TerPPHs && TerPPHs.length > 0) {
                return this.sendSuccessGet(req, res, TerPPHs, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a TerPPH by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ter_pph');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const TerPPH = await this.TerPPHService.findByPKID(req, id);
            if (TerPPH) {
                return this.sendSuccessGet(req, res, TerPPH, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ter_pph');

            const result = await this.TerPPHService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ter_pph');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.TerPPHService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'ter_pph');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            
            await this.TerPPHService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    async getByIncome(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ter_pph');

            const args = new GetTerPPhByIncomeInputVM(req.body);

            const TerPPH = await this.TerPPHService.getTerPPhByIncome(req, args);
            
            return this.sendSuccessGet(req, res, TerPPH, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
