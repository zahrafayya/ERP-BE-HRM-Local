import { Request, Response } from 'express';
import { BukpotBlueService } from '../../business-layer/services/bukpot_blue.service';
import { EmployeeService } from '../../business-layer/services/employee.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { generateBukpotBlueId } from '../../helpers/utils/generateId';

export class BukpotBlueController extends BaseController {
    private BukpotBlueService: BukpotBlueService;
    private EmployeeService: EmployeeService;

    constructor() {
        super();
        this.BukpotBlueService = new BukpotBlueService();
        this.EmployeeService = new EmployeeService();
    }

    /**
     * Handles request to get all BukpotBlues.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot_blue');

            const BukpotBlues = await this.BukpotBlueService.getBukpotBlueForIndex(req);
            if (BukpotBlues && BukpotBlues.length > 0) {
                return this.sendSuccessGet(req, res, BukpotBlues, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a BukpotBlue by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot_blue');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const BukpotBlue = await this.BukpotBlueService.countBukpotBlue(req, id);
            if (BukpotBlue) {
                return this.sendSuccessGet(req, res, BukpotBlue, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot_blue');

            // req.body['pkid'] = generateBukpotBlueId();

            const result = await this.BukpotBlueService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'bukpot_blue');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.BukpotBlueService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'bukpot_blue');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            
            await this.BukpotBlueService.delete(req, id);

            return this.sendSuccessDelete(req, res);
        } catch (error) {
            return this.handleError(req, res, error, 500);
        }
    }
}
