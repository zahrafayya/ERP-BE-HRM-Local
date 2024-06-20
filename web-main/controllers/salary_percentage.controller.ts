import { Request, Response } from 'express';
import { SalaryPercentageService } from '../../business-layer/services/salary_percentage.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { defaultSalaryPercentage } from '../../data-access/utility/defaultData';

export class SalaryPercentageController extends BaseController {
    private SalaryPercentageService: SalaryPercentageService;

    constructor() {
        super();
        this.SalaryPercentageService = new SalaryPercentageService();
    }

    /**
     * Handles request to find a SalaryPercentage by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_percentage');

            const SalaryPercentage = await this.SalaryPercentageService.findAll(req);
            if (SalaryPercentage.length !== 0) {
                return this.sendSuccessGet(req, res, SalaryPercentage[0], MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                const newSalaryPercentage = await this.SalaryPercentageService.create(req, defaultSalaryPercentage);

                if (typeof newSalaryPercentage == 'string') {
                    return this.sendErrorBadRequest(req, res);
                }
                return this.sendSuccessGet(req, res, newSalaryPercentage, MessagesKey.SUCCESSGETBYID, 200, true);
            }            
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'salary_percentage');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.SalaryPercentageService.update(req, id, data);
            if (pr) {
                return this.sendSuccessUpdate(req, res, pr, id);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }
     
}
