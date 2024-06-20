import { Request, Response } from 'express';
import { AllowanceService } from '../../business-layer/services/allowance.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { AllowanceAttributes } from '../../infrastructure/models/allowance.model';
import db from '../../infrastructure/models';

export class AllowanceController extends BaseController {
    private AllowanceService: AllowanceService;

    constructor() {
        super();
        this.AllowanceService = new AllowanceService();
    }

    /**
     * Handles request to get all Allowances.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance');

            const Allowances = await this.AllowanceService.findAll(req);
            if (Allowances && Allowances.length > 0) {
                return this.sendSuccessGet(req, res, Allowances, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async findAllDistinctAllowanceNames(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance');

            const Allowance = await this.AllowanceService.findAllDistinctAllowanceNames(req);

            if (Allowance) {
                return this.sendSuccessGet(req, res, Allowance, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
            return res.status(404).send('Allowance not found');
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Allowance by their primary key ID.
     */
    public async findBySalarySlipID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const Allowance = await this.AllowanceService.where(req, {
                ss_id: id
            }, [{
                model: db.AllowanceName
            }]);
            if (Allowance) {
                return this.sendSuccessGet(req, res, Allowance, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance');

            const arr = req.body;

            let result: any;
            await arr.map(async (item: AllowanceAttributes) => {
                result = await this.AllowanceService.create(req, item);
            })
            
            return this.sendSuccessCreate(req, res, result);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.AllowanceService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'allowance');

            const arr = req.body;

            await arr.map(async (id: number) => {
                await this.AllowanceService.delete(req, id);
            });
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }
}
