import { Request, Response } from 'express';
import { PTKPService } from '../../business-layer/services/ptkp.service';
import { EmployeeService } from '../../business-layer/services/employee.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';

export class PTKPController extends BaseController {
    private PTKPService: PTKPService;
    private EmployeeService: EmployeeService;

    constructor() {
        super();
        this.PTKPService = new PTKPService();
        this.EmployeeService = new EmployeeService();
    }

    /**
     * Handles request to get all PTKPs.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ptkp');

            const PTKPs = await this.PTKPService.findAll(req);
            if (PTKPs && PTKPs.length > 0) {
                return this.sendSuccessGet(req, res, PTKPs, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a PTKP by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ptkp');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const PTKP = await this.PTKPService.findByPKID(req, id);
            if (PTKP) {
                return this.sendSuccessGet(req, res, PTKP, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ptkp');

            const result = await this.PTKPService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'ptkp');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.PTKPService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'ptkp');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const employee = await this.EmployeeService.where(req, {
                ptkp_id: id
            });

            if (employee.length !== 0) {
                return res.status(400).send('Employee exist in this PTKP');
            }
            
            await this.PTKPService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
