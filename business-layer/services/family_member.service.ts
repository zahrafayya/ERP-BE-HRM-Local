import { FamilyMemberRepository } from '../../data-access/repositories/family_member.repository';
import { FamilyMember } from '../../infrastructure/models/family_member.model';
import { BaseService } from '../common/base.service';
import { Request } from 'express';

export class FamilyMemberService extends BaseService<FamilyMember> {
    private familyMemberRepository: FamilyMemberRepository;

    constructor() {
        const familyMemberRepository = new FamilyMemberRepository();

        super(familyMemberRepository);

        this.familyMemberRepository = familyMemberRepository;
    }

    async deleteFamilyMemberByEmployeeID(req: Request, id: number): Promise<void> {
        try {
            await this.familyMemberRepository.deleteByEmployeeID(req, id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error occurred in FamilyMemberService - delete: ' + error.message);
            }
            throw error;
        }
    }
}
