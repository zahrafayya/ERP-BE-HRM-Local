import { Request, Response } from 'express';
import { PositionService } from '../../business-layer/services/position.service';
import { EmployeeService } from '../../business-layer/services/employee.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';

export class PositionController extends BaseController {
    private PositionService: PositionService;
    private EmployeeService: EmployeeService;

    constructor() {
        super();
        this.PositionService = new PositionService();
        this.EmployeeService = new EmployeeService();
    }

    /**
     * Handles request to get all Positions.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'position');

            const Positions = await this.PositionService.findAll(req);
            if (Positions && Positions.length > 0) {
                return this.sendSuccessGet(req, res, Positions, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a Position by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'position');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const Position = await this.PositionService.findByPKID(req, id);
            if (Position) {
                return this.sendSuccessGet(req, res, Position, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'position');

            const result = await this.PositionService.create(req, req.body);
            if (typeof result !== 'string') 
                return this.sendSuccessCreate(req, res, result, result?.dataValues.pkid);
            
            return this.sendErrorCreation(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'position');

            const id = parseInt(req.params.id);
            const data = req.body;
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const pr = await this.PositionService.update(req, id,data);
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
            await this.authMiddleware(req, res, 'position');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }

            const employee = await this.EmployeeService.where(req, {
                position_id: id
            });

            if (employee.length !== 0) {
                return res.status(400).send('Employee exist in this position');
            }
            
            await this.PositionService.delete(req, id);
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
