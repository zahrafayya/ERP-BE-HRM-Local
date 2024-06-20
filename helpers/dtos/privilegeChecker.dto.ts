export interface PrivilegeCheckerResultDTO {
    user_id: number;
    tenant_id: number;
    is_granted: boolean;
    method: string;
    can_read: boolean;
    can_read_all: boolean;
    can_create: boolean;
    can_update: boolean;
    can_delete: boolean;
}