import { Request, Response } from 'express';
import { AllowanceNameService } from '../../business-layer/services/allowance_name.service';
import { AllowanceService } from '../../business-layer/services/allowance.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';

export class AllowanceNameController extends BaseController{
    private AllowanceNameService: AllowanceNameService;
    private AllowanceService: AllowanceService;


    constructor() {
        super();
        this.AllowanceNameService = new AllowanceNameService();
        this.AllowanceService = new AllowanceService();
    }

    /**
     * Handles request to get all AllowanceNames.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance_name');

            const AllowanceNames = await this.AllowanceNameService.findAll(req);

            if (AllowanceNames && AllowanceNames.length > 0) {
                return this.sendSuccessGet(req, res, AllowanceNames, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance_name');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const result = await this.AllowanceNameService.findByPKID(req, id);

            if (result) {
                return this.sendSuccessGet(req, res, result, MessagesKey.SUCCESSGETBYID, 200, true);
            } 
            return this.sendErrorNotFound(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    } 

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance_name');

            const result = await this.AllowanceNameService.create(req, req.body);

            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance_name');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const result = await this.AllowanceNameService.update(req, id, req.body);

            if (typeof result !== 'string') 
                return this.sendSuccessUpdate(req, res, result, id);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }


    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'allowance_name');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const allowance = await this.AllowanceService.where(req, {
                allowance_name_id: id
            })

            if (allowance.length !== 0) {
                return res.status(400).send('Salary slip that have this allowance exists');
            }

            await this.AllowanceNameService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }
}
