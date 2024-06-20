import { Request, Response } from 'express';
import { WhitePayrollService } from '../../business-layer/services/white_payroll.service';
import { PositionService } from '../../business-layer/services/position.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';

export class WhitePayrollController extends BaseController {
    private PositionService: PositionService;
    private WhitePayrollService: WhitePayrollService;

    constructor() {
        super();
        this.PositionService = new PositionService();
        this.WhitePayrollService = new WhitePayrollService();
    }

    /**
     * Handles request to get all WhitePayrolls.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'white_payroll');

            const WhitePayrolls = await this.WhitePayrollService.findAll(req);
            if (WhitePayrolls && WhitePayrolls.length > 0) {
                return this.sendSuccessGet(req, res, WhitePayrolls, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a WhitePayroll by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'white_payroll');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const WhitePayroll = await this.WhitePayrollService.findByPKID(req, id);
            if (WhitePayroll) {
                return this.sendSuccessGet(req, res, WhitePayroll, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'white_payroll');

            const result = await this.WhitePayrollService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'white_payroll');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.WhitePayrollService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'white_payroll');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const position = await this.PositionService.where(req, { white_payroll_id: id });

            if (position?.length !== 0) {
                return res.status(400).send('Position exist in this WhitePayroll');
            }
            
            await this.WhitePayrollService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
