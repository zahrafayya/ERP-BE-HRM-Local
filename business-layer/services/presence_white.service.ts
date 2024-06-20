import { PresenceWhiteRepository } from '../../data-access/repositories/presence_white.repository';
import { PresenceWhite } from '../../infrastructure/models/presence_white.model';
import { BaseService } from '../common/base.service';
import { Request } from 'express';
import db from '../../infrastructure/models';
import { CountPresenceWhiteInputVM } from '../../helpers/view-models/presence_white.vm';

export class PresenceWhiteService extends BaseService<PresenceWhite> {
    private presenceWhiteRepository: PresenceWhiteRepository;

    constructor() {
        const presenceWhiteRepository = new PresenceWhiteRepository();

        super(presenceWhiteRepository);

        this.presenceWhiteRepository = presenceWhiteRepository;
    }

    async countPresenceWhite(req: Request, data: CountPresenceWhiteInputVM): Promise<PresenceWhite[]> {
        try {
            const employee_id = data.bukpotInput.employee_id;
            const month = data.bukpotInput.month;
            const year = data.bukpotInput.year;

            const allPresence = await this.presenceWhiteRepository.where(req, {
                employee_id,
                date: {
                    [db.Sequelize.Op.and]: [
                        db.Sequelize.where(db.Sequelize.fn('MONTH', db.Sequelize.col('date')), month),
                        db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), year),
                    ],
                },
            },);
            return allPresence;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error occurred in PresenceWhiteService: ' + error.message);
            }
            throw error;
        }
    }
}