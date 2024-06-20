import { PresenceBlue } from "../../infrastructure/models/presence_blue.model";

export interface CountHourPresenceBlueInputDTO {
    employee_id: number;
    month: number;
    year: number;
}

export interface CountHourPresenceBlueOutputDTO {
    penalty_hour: number;
    work_hour: number;
    allPresence: PresenceBlue[];
}

export interface CountHourPresenceBlueByStartLastDateInputDTO {
    employee_id: number;
    start_date: Date;
    last_date: Date;
}