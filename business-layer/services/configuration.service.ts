import { ConfigurationRepository } from '../../data-access/repositories/configuration.repository';
import { Configuration, ConfigurationAttributes } from '../../infrastructure/models/configuration.model';
import { BaseService } from '../common/base.service';

export class ConfigurationService extends BaseService<Configuration> {
    private configurationRepository: ConfigurationRepository;

    constructor() {
        const configurationRepository = new ConfigurationRepository();

        super(configurationRepository);

        this.configurationRepository = configurationRepository;
    }

}
