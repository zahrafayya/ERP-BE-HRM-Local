import { Request, Response } from 'express';
import { FamilyMemberService } from '../../business-layer/services/family_member.service';
import { BaseController } from '../common/base.controller';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { FamilyMember, FamilyMemberAttributes } from '../../infrastructure/models/family_member.model';

export class FamilyMemberController extends BaseController {
    private FamilyMemberService: FamilyMemberService;

    constructor() {
        super();
        this.FamilyMemberService = new FamilyMemberService();
    }

    /**
     * Handles request to get all FamilyMembers.
     */
    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'family_member');

            const FamilyMembers = await this.FamilyMemberService.findAll(req);
            if (FamilyMembers && FamilyMembers.length > 0) {
                return this.sendSuccessGet(req, res, FamilyMembers, MessagesKey.SUCCESSGET, 200);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    /**
     * Handles request to find a FamilyMember by their primary key ID.
     */
    public async findByID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'family_member');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const FamilyMember = await this.FamilyMemberService.findByPKID(req, id);
            if (FamilyMember) {
                return this.sendSuccessGet(req, res, FamilyMember, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async findByEmployeeID(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'family_member');

            const id = parseInt(req.params.id);
            if (!id) {
                return this.sendErrorBadRequest(req, res);
            }
            const FamilyMembers = await this.FamilyMemberService.where(req, {
                employee_id: id
            });
            if (FamilyMembers) {
                return this.sendSuccessGet(req, res, FamilyMembers, MessagesKey.SUCCESSGETBYID, 200, true);
            } else {
                return this.sendErrorNotFound(req, res);
            }
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'family_member');

            const arr = req.body;

            let result!: FamilyMember | string;
            await arr.map(async (e: FamilyMemberAttributes) => {
                result = await this.FamilyMemberService.create(req, e);
                if (typeof result === 'string') {
                    return res.status(400).send(result);
                }
            });

            if (typeof result === 'string') {
                return res.status(400).send(result);
            }
            
            return this.sendSuccessCreate(req, res, result);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'family_member');

            const arr = req.body;

            let result: any;
            await arr.map(async (item: FamilyMemberAttributes) => {
                if (item.pkid === undefined) {
                    return res.status(400).send('Invalid FamilyMember ID');
                }
                result = await this.FamilyMemberService.update(req, item.pkid, item)
            });

            return this.sendSuccessUpdate(req, res, result);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this.authMiddleware(req, res, 'family_member');

            const arr = req.body;

            await arr.map(async (id: number) => {
                await this.FamilyMemberService.delete(req, id);
            });
            
            return this.sendSuccessDelete(req, res);
        } catch (error) {
             return this.handleError(req, res, error, 500);
        }
    }

     
}
