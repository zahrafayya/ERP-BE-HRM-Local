import { Request, Response } from 'express';
import { DepartmentService } from '../../business-layer/services/department.service';
import { PositionService } from '../../business-layer/services/position.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';

export class DepartmentController extends BaseController {
    private DepartmentService: DepartmentService;
    private PositionService: PositionService;

    constructor() {
        super();
        this.DepartmentService = new DepartmentService();
        this.PositionService = new PositionService();
    }

    /**
     * Handles request to get all Departments.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'department');

            const Departments = await this.DepartmentService.findAll(req);
            if (Departments && Departments.length > 0) {
                return this.sendSuccessGet(req, res, Departments, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Department by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'department');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const Department = await this.DepartmentService.findByPKID(req, id);
            if (Department) {
                return this.sendSuccessGet(req, res, Department, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'department');

            const result = await this.DepartmentService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'department');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.DepartmentService.update(req, id, data);
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
            await this.authMiddleware(req, res, 'department');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const position = await this.PositionService.where(req, {
                department_id: id
            });

            if (position.length !== 0) {
                return res.status(400).send('Position exist in this department');
            }
            
            await this.DepartmentService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
