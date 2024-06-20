import { BaseRepository } from '../utility/base.repository';
import { RecruitmentRequest } from '../../infrastructure/models/recruitment_request.model';
import { ModelStatic } from 'sequelize';
import db from '../../infrastructure/models'

export class RecruitmentRequestRepository extends BaseRepository<RecruitmentRequest> {
    constructor() {
        super(db.RecruitmentRequest as ModelStatic<RecruitmentRequest>);
    }
}