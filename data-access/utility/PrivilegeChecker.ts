import {MessagesKey} from '../../helpers/messages/messagesKey';
import { Request } from "express";
import { PrivilegeCheckerResultDTO } from "../../helpers/dtos/privilegeChecker.dto";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export class PrivilegeChecker {
    public static async getPrivilege(req: Request, token: string, method: string, module: string, router: string): Promise<PrivilegeCheckerResultDTO> {
        const bodyData = { token, method, module, router };

        return await axios.post(
            process.env.GENERAL_SETTINGS_USER_MANAGEMENT_URL + 'auth/get_privilege',
            bodyData
        )
        .then(response => {
            const resp = response.data.data as PrivilegeCheckerResultDTO;
            return resp;
        })
        .catch(error => {
            throw new Error(MessagesKey.ERRORINVALIDTOKEN);
        });
    }
}