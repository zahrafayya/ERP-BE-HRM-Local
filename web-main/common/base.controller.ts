import { Request, Response } from 'express';
import { getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { IResultVM } from '../../helpers/view-models/result.vm';
import { PrivilegeCheckerResultDTO } from '../../helpers/dtos/privilegeChecker.dto';
import { PrivilegeChecker } from '../../data-access/utility/PrivilegeChecker';

export abstract class BaseController {
    private moduleName = 'erp_hrm';

    // Middleware Function
    protected authMiddleware = async (req: Request, res: Response, router: string) => {
        const authorization = req.headers.authorization;

        if (typeof authorization !== 'string' || authorization === null) {
            throw new Error(getMessage(req, MessagesKey.ERRORMISSINGTOKEN));
        }

        const token = authorization.split(' ')[1];

        const privilegeResult: PrivilegeCheckerResultDTO = await PrivilegeChecker.getPrivilege(req, token, req.method, this.moduleName, router);

        if (!privilegeResult.is_granted) {
            throw new Error(MessagesKey.ERRORINVALIDTOKEN);
        }

        req.headers['user'] = privilegeResult.user_id.toString();
        req.headers['tenant'] = privilegeResult.tenant_id.toString();
        req.headers['can_read_all'] = privilegeResult.can_read_all ? 'true' : 'false';

        res.setHeader('can_read', privilegeResult.can_read ? 'true' : 'false');
        res.setHeader('can_read_all', privilegeResult.can_read_all ? 'true' : 'false');
        res.setHeader('can_create', privilegeResult.can_create ? 'true' : 'false');
        res.setHeader('can_update', privilegeResult.can_update ? 'true' : 'false');
        res.setHeader('can_delete', privilegeResult.can_delete ? 'true' : 'false');

        return privilegeResult;
    }

    protected authMiddlewareAlwaysTrue = async (req: Request, res: Response, router: string) => {
        const authorization = req.headers.authorization;

        if (typeof authorization !== 'string' || authorization === null) {
            throw new Error(getMessage(req, MessagesKey.ERRORMISSINGTOKEN));
        }

        const token = authorization.split(' ')[1];

        const privilegeResult: PrivilegeCheckerResultDTO = await PrivilegeChecker.getPrivilege(req, token, req.method, this.moduleName, router);

        req.headers['user'] = privilegeResult.user_id.toString();
        req.headers['tenant'] = privilegeResult.tenant_id.toString();
        req.headers['can_read_all'] = 'true';

        res.setHeader('can_read', 'true');
        res.setHeader('can_read_all', 'true');
        res.setHeader('can_create', 'true');
        res.setHeader('can_update', 'true');
        res.setHeader('can_delete', 'true');

        return privilegeResult;
    }

    //region Success Handlers

    /**
     * Sends a successful response.
     */
    protected sendSuccess(res: Response, vm: IResultVM): Response {
        return res.status(vm.status).json({
            data: vm.data,
            message: vm.message,
            returnId: vm.returnId,
            isSuccess: vm.isSuccess,
            status: vm.status
        });
    }

    protected sendSuccessGet(req: Request, res: Response, data: any, messageKey: MessagesKey, status: number = 200, byId: boolean = false): Response {
        const message = getMessage(req, messageKey);
        const vm: IResultVM = {
            data,
            message,
            isSuccess: true,
            status,
        };
        return this.sendSuccess(res, vm);
    }

    protected sendSuccessCreate(req: Request, res: Response, data: any, returnId?: number | string): Response {
        const message = getMessage(req, MessagesKey.SUCCESSCREATE);
        const vm: IResultVM = {
            data,
            message,
            returnId,
            isSuccess: true,
            status: 201 // HTTP status code for Created
        };
        return this.sendSuccess(res, vm);
    }

    protected sendSuccessUpdate(req: Request, res: Response, data: any, returnId?: number | string): Response {
        const message = getMessage(req, MessagesKey.SUCCESSUPDATE);
        const vm: IResultVM = {
            data,
            message,
            returnId,
            isSuccess: true,
            status: 200 // HTTP status code for OK
        };
        return this.sendSuccess(res, vm);
    }

    protected sendSuccessDelete(req: Request, res: Response): Response {
        const message = getMessage(req, MessagesKey.SUCCESSDELETE);
        const vm: IResultVM = {
            data: null,
            message,
            isSuccess: true,
            status: 204 // HTTP status code for No Content
        };
        return this.sendSuccess(res, vm);
    }

    //endregion

    //region Error Handlers

    /**
     * Handles errors and sends an error response.
     * Now uses the message utility to fetch error messages based on request language.
     */
    protected handleError(req: Request, res: Response, error: any, statusCode: number = 500): Response {
        const errorMessage = error instanceof Error ? error.message : getMessage(req, MessagesKey.UNKNOWNERROR);
        const vm: IResultVM = {
            data: null,
            message: errorMessage,
            isSuccess: false,
            status: statusCode
        };
        return this.sendSuccess(res, vm);
    }

    protected sendErrorBadRequest(req: Request, res: Response): Response {
        return this.handleError(req, res, new Error(getMessage(req, MessagesKey.BADREQUEST)), 400);
    }

    protected sendErrorUnauthorized(req: Request, res: Response): Response {
        return this.handleError(req, res, new Error(getMessage(req, MessagesKey.UNAUTHORIZED)), 401);
    }

    protected sendErrorNotFound(req: Request, res: Response): Response {
        return this.handleError(req, res, new Error(getMessage(req, MessagesKey.NODATAFOUND)), 404);
    }

    protected sendErrorNoDataFoundSuccess(req: Request, res: Response): Response {
        return this.handleError(req, res, new Error(getMessage(req, MessagesKey.NODATAFOUND)), 200);
    }

    protected sendErrorCreation(req: Request, res: Response): Response {
        return this.handleError(req, res, new Error(getMessage(req, MessagesKey.ERRORCREATION)), 400);
    }

    //endregion
}
