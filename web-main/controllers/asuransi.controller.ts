import { Request, Response } from 'express';
import { AsuransiService } from '../../business-layer/services/asuransi.service';
import { EmployeeService } from '../../business-layer/services/employee.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { generateAsuransiId } from '../../helpers/utils/generateId';

export class AsuransiController extends BaseController {
    private AsuransiService: AsuransiService;
    private EmployeeService: EmployeeService;

    constructor() {
        super();
        this.AsuransiService = new AsuransiService();
        this.EmployeeService = new EmployeeService();
    }

    /**
     * Handles request to get all Asuransis.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'asuransi');
            
            const Asuransis = await this.AsuransiService.findAll(req);
            if (Asuransis && Asuransis.length > 0) {
                return this.sendSuccessGet(req, res, Asuransis, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Asuransi by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'asuransi');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const Asuransi = await this.AsuransiService.findByPKID(req, id);
            if (Asuransi) {
                return this.sendSuccessGet(req, res, Asuransi, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'asuransi');

            // req.body['pkid'] = generateAsuransiId();

            const result = await this.AsuransiService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'asuransi');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.AsuransiService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'asuransi');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const employee = await this.EmployeeService.where(req, {
                asuransi_id: id
            });

            if (employee.length !== 0) {
                return res.status(400).send('Employee exist in this Asuransi');
            }
            
            await this.AsuransiService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
