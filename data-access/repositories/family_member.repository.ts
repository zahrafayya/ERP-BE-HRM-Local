import { BaseRepository } from '../utility/base.repository';
import { FamilyMember } from '../../infrastructure/models/family_member.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'
import { Request } from 'express';

export class FamilyMemberRepository extends BaseRepository<FamilyMember> {
    constructor() {
        super(db.FamilyMember as ModelStatic<FamilyMember>);
    }

    async deleteByEmployeeID(req: Request, id: number): Promise<void> {
        try {
            const deleteInfo = await this.extractDeleteInfo(req);

            const familyMembers = await db.FamilyMember.findAll({ where: { employee_id: id, tenant: deleteInfo.tenant } });
            if (familyMembers.length > 0) {
                await Promise.all(familyMembers.map(async (familyMember: FamilyMember) => {
                    await familyMember.destroy();
                }));
                console.log(`All family members with employee ID ${id} deleted successfully.`);
            } else {
                console.log(`No family members found with employee ID ${id}.`);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error deleting family members: ' + error.message);
            }
            throw error;
        }
    }
}