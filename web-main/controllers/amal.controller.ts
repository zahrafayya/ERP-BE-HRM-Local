import { Request, Response } from 'express';
import { AmalService } from '../../business-layer/services/amal.service';
import { EmployeeService } from '../../business-layer/services/employee.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { generateAmalId } from '../../helpers/utils/generateId';

export class AmalController extends BaseController {
    private AmalService: AmalService;
    private EmployeeService: EmployeeService;

    constructor() {
        super();
        this.AmalService = new AmalService();
        this.EmployeeService = new EmployeeService();
    }

    /**
     * Handles request to get all Amals.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'amal');

            const Amals = await this.AmalService.findAll(req);
            if (Amals && Amals.length > 0) {
                return this.sendSuccessGet(req, res, Amals, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Amal by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'amal');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const Amal = await this.AmalService.findByPKID(req, id);
            if (Amal) {
                return this.sendSuccessGet(req, res, Amal, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'amal');

            // req.body['pkid'] = generateAmalId();

            const result = await this.AmalService.create(req, req.body);

            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'amal');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.AmalService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'amal');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const employee = await this.EmployeeService.where(req, {
                amal_id: id
            });

            if (employee.length !== 0) {
                return res.status(400).send('Employee exist in this Amal');
            }
            
            await this.AmalService.softDelete(req, id);

            return this.sendSuccessDelete(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }
}
