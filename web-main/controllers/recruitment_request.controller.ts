import { Request, Response } from 'express';
import { RecruitmentRequestService } from '../../business-layer/services/recruitment_request.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { generateRecruitmentRequestId } from '../../helpers/utils/generateId';

export class RecruitmentRequestController extends BaseController {
    private RecruitmentRequestService: RecruitmentRequestService;

    constructor() {
        super();
        this.RecruitmentRequestService = new RecruitmentRequestService();
    }

    /**
     * Handles request to get all RecruitmentRequests.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'recruitment_request');

            const RecruitmentRequests = await this.RecruitmentRequestService.findAll(req);
            if (RecruitmentRequests && RecruitmentRequests.length > 0) {
                return this.sendSuccessGet(req, res, RecruitmentRequests, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a RecruitmentRequest by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'recruitment_request');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const RecruitmentRequest = await this.RecruitmentRequestService.findByPKID(req, id);
            if (RecruitmentRequest) {
                return this.sendSuccessGet(req, res, RecruitmentRequest, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'recruitment_request');

            const result = await this.RecruitmentRequestService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'recruitment_request');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.RecruitmentRequestService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'recruitment_request');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const item = await this.RecruitmentRequestService.findByPKID(req, id);

            if (item?.getDataValue('already_recruited') !== 0) {
                return res.status(400).send('Employee exist in this recruitment request');
            }
            
            await this.RecruitmentRequestService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
