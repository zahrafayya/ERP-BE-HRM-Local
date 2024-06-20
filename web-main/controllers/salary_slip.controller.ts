import { Request, Response } from 'express';
import { SalarySlipService } from '../../business-layer/services/salary_slip.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { CountPresenceWhiteInputVM } from '../../helpers/view-models/presence_white.vm';
import { CountSalarySlipInputVM } from '../../helpers/view-models/salary_slip.vm';
import db from '../../infrastructure/models';

export class SalarySlipController extends BaseController {
    private SalarySlipService: SalarySlipService;

    constructor() {
        super();
        this.SalarySlipService = new SalarySlipService();
    }

    /**
     * Handles request to get all SalarySlips.
     */
    public async findAllWhite(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const SalarySlips = await this.SalarySlipService.getWhiteSalarySlipForIndex(req);
            if (SalarySlips && SalarySlips.length > 0) {
                return this.sendSuccessGet(req, res, SalarySlips, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async findAllBlue(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const SalarySlips = await this.SalarySlipService.getBlueSalarySlipForIndex(req);
            if (SalarySlips && SalarySlips.length > 0) {
                return this.sendSuccessGet(req, res, SalarySlips, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a SalarySlip by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const SalarySlip = await this.SalarySlipService.findByPKID(req, id, [{ 
                model: db.Employee,
                include: [{
                    model: db.Position,
                    include: [{
                        model: db.WhitePayroll
                    }]
                }]
            }]);
            if (SalarySlip) {
                return this.sendSuccessGet(req, res, SalarySlip, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const result = await this.SalarySlipService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.SalarySlipService.update(req, id, data);
            if (pr) {
                return this.sendSuccessUpdate(req, res, pr, id);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async bulkUpdateStatus(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const data = req.body;

            let result: any;
            await data.item.map(async (element: number) => {
                result = await this.SalarySlipService.update(req, element, {
                    status: data.status,
                });
            })

            return this.sendSuccessUpdate(req, res, result, data.item);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            
            await this.SalarySlipService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async countWhiteSalarySlipByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const newWorkcentre = await this.SalarySlipService.countFromWhiteSalarySlip(req, id);
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async countBlueSalarySlipByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const id = parseInt(req.params.id);
            const tunjangan_lain_args = req.params.tunjangan_lain;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const newWorkcentre = await this.SalarySlipService.countFromBlueSalarySlip(req, id, parseFloat(tunjangan_lain_args));
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async countBaseWhite(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const args = new CountPresenceWhiteInputVM(req.body)

            const newWorkcentre = await this.SalarySlipService.countSalaryWhite(req, args);
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async countHourBaseWhite(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const args = new CountPresenceWhiteInputVM(req.body)

            const newWorkcentre = await this.SalarySlipService.countHourSalaryWhite(req, args);
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async count(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_slip');

            const args = new CountSalarySlipInputVM(req.body)

            const newWorkcentre = await this.SalarySlipService.countSalarySlip(req, args);
            return this.sendSuccessGet(req, res, newWorkcentre, MessagesKey.SUCCESSGETBYID, 200, true);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }


     
}
