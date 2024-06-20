import { Request, Response } from 'express';
import { BukpotService } from '../../business-layer/services/bukpot.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { CountNettoInputDTO } from '../../helpers/dtos/bukpot.dto';
import { CountBukpotInputVM, CountNettoInputVM } from '../../helpers/view-models/bukpot.vm';
import db from '../../infrastructure/models';

export class BukpotController extends BaseController {
    private BukpotService: BukpotService;

    constructor() {
        super();
        this.BukpotService = new BukpotService();
    }

    /**
     * Handles request to get all Bukpots.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot');

            const Bukpots = await this.BukpotService.getBukpotForIndex(req);
            if (Bukpots && Bukpots.length > 0) {
                return this.sendSuccessGet(req, res, Bukpots, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Bukpot by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const bukpot = await this.BukpotService.findByPKID(req, id, [{ model: db.Employee }]);

            if (bukpot == null) {
                return this.sendErrorNotFound(req, res);
            }

            const bodyArgs = new CountBukpotInputVM({
                employee_id: bukpot?.dataValues.employee_id,
                ptkp_id: bukpot?.dataValues.ptkp_id,
                year: bukpot?.dataValues.year
            })

            const count = await this.BukpotService.countBukpot(req, bodyArgs);

            const service_result = {
                data: bukpot,
                count: count
            }

            return this.sendSuccessGet(req, res, service_result, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot');

            const result = await this.BukpotService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.BukpotService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'bukpot');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            
            await this.BukpotService.delete(req, id);

            return this.sendSuccessDelete(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async count(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot');

            const inputData = new CountBukpotInputVM(req.body);

            const newWorkcentre = await this.BukpotService.countBukpot(req, inputData);
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async countNetto(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot');

            const inputData = new CountNettoInputVM({
                ptkp_id: parseInt(req.params.ptkp_id),
                penghasilan_netto: parseInt(req.params.penghasilan_netto),
            });

            const newWorkcentre = await this.BukpotService.countPPhFromNetto(req, inputData);
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }
}
