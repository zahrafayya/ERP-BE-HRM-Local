import { PresenceBlueRepository } from '../../data-access/repositories/presence_blue.repository';
import { PresenceBlue, PresenceBlueAttributes } from '../../infrastructure/models/presence_blue.model';
import { ConfigurationService } from './configuration.service';
import { BaseService } from '../common/base.service';
import { Request } from 'express';
import db from '../../infrastructure/models';
import { CountHourPresenceBlueByStartLastDateInputVM, CountHourPresenceBlueInputVM, CountHourPresenceBlueOutputVM } from '../../helpers/view-models/presence_blue.vm';
import { Configuration } from '../../infrastructure/models/configuration.model';

export class PresenceBlueService extends BaseService<PresenceBlue> {
    private presenceBlueRepository: PresenceBlueRepository;
    private configurationService: ConfigurationService;

    constructor() {
        const presenceBlueRepository = new PresenceBlueRepository();
        const configurationService = new ConfigurationService();

        super(presenceBlueRepository);

        this.presenceBlueRepository = presenceBlueRepository;
        this.configurationService = configurationService;
    }
 
    calculateHours(allPresence: PresenceBlue[], configuration: Configuration[]) {
        let penalty_hour = 0;
        let work_hour = 0;

        allPresence?.forEach((presence: PresenceBlue) => {
            // count penalty hour
            const check_in = presence.dataValues.check_in;
            let actual_check_in = presence.dataValues.actual_check_in;

            if (check_in && actual_check_in) {
                if (configuration[0]?.dataValues.blue_late_time_tolerance) {
                    let parts = configuration[0]?.dataValues.blue_late_time_tolerance.split(':');
                    let hours_tolerance = parseInt(parts[0], 10);
                    let minutes_tolerance = parseInt(parts[1], 10); 

                    actual_check_in.setHours(actual_check_in.getHours() - hours_tolerance);
                    actual_check_in.setMinutes(actual_check_in.getMinutes() - minutes_tolerance);
                }

                const checkInDifference = actual_check_in.getTime() - check_in.getTime();
                if (checkInDifference > 0) {
                    penalty_hour += checkInDifference / (1000 * 60 * 60);
                }
            }

            // count work hour
            const check_out = presence.dataValues.check_out;
            const actual_check_out = presence.dataValues.actual_check_out;
            let workHourDifference = 0;
            if (actual_check_out === undefined && actual_check_in && check_out) {
                workHourDifference = check_out.getTime() - actual_check_in.getTime();
            }
            else if (actual_check_out && actual_check_in) {
                workHourDifference = actual_check_out.getTime() - actual_check_in.getTime();
            }

            if (workHourDifference > 0) {
                work_hour += workHourDifference / (1000 * 60 * 60);
            }
        });

        penalty_hour = parseFloat(penalty_hour.toFixed(2));
        work_hour = parseFloat(work_hour.toFixed(2));

        return { penalty_hour, work_hour };
    }

    async countHourPresenceBlue(req: Request, data: CountHourPresenceBlueInputVM): Promise<CountHourPresenceBlueOutputVM> {
        try {
            const employee_id = data.bukpotInput.employee_id;
            const month = data.bukpotInput.month
            const year = data.bukpotInput.year;

            const allPresence = await this.presenceBlueRepository.where(req, {
                employee_id,
                    check_in: {
                        [db.Sequelize.Op.and]: [
                            db.Sequelize.where(db.Sequelize.fn('MONTH', db.Sequelize.col('check_in')), month),
                            db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('check_in')), year),
                        ],
                    },
            });
            console.log(employee_id, month, year);
            console.log(allPresence);
            const configuration = await this.configurationService.findAll(req);

            if (configuration.length === 0) {
                throw new Error('Configuration not found');
            }

            let work_hour = 0;
            let penalty_hour = 0;

            if (allPresence !== null) {
                const res = this.calculateHours(allPresence, configuration);
                work_hour = res.work_hour;
                penalty_hour = res.penalty_hour;
            }

            const returnData = new CountHourPresenceBlueOutputVM({ penalty_hour, work_hour, allPresence });

            return returnData;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in PresenceWhiteService: ' + error.message);
            }
            throw error;
        }
    }

    async countHourPresenceBlueByStartLastDate(req: Request, data: CountHourPresenceBlueByStartLastDateInputVM): Promise<CountHourPresenceBlueOutputVM> {
        try {
            const employee_id = data.countOutput.employee_id;
            const start_date = data.countOutput.start_date;
            const last_date = data.countOutput.last_date;

            const allPresence = await this.presenceBlueRepository.where(req, {
                employee_id,
                    check_in: {
                        [db.Sequelize.Op.gte]: start_date, // Greater than or equal to start_date
                        [db.Sequelize.Op.lte]: last_date,   // Less than or equal to end_date
                    },
            });
            const configuration = await this.configurationService.findAll(req);

            if (configuration.length === 0) {
                throw new Error('Configuration not found');
            }

            let work_hour = 0;
            let penalty_hour = 0;

            if (allPresence !== null) {
                const res = this.calculateHours(allPresence, configuration);
                work_hour = res.work_hour;
                penalty_hour = res.penalty_hour;
            }

            const returnData = new CountHourPresenceBlueOutputVM({ penalty_hour, work_hour, allPresence });
            console.log(allPresence);
            console.log(returnData);

            return returnData;
        } catch (error) {
            if (error instanceof Error) {
                // Log the error or handle it as per your application's error handling policy
                throw new Error('Error occurred in PresenceWhiteService: ' + error.message);
            }
            throw error;
        }
    }
    
}
