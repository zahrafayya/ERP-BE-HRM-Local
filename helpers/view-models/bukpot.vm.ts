import { CountBukpotInputDTO, CountBukpotOutputDTO, CountNettoInputDTO, CountNettoOutputDTO } from '../dtos/bukpot.dto';

export class CountBukpotInputVM {
    bukpotInput: CountBukpotInputDTO;

    constructor(bukpotInput: CountBukpotInputDTO) {
        this.bukpotInput = bukpotInput;
    }
}

export class CountBukpotOutputVM {
    bukpotOutput: CountBukpotOutputDTO;

    constructor(bukpotOutput: CountBukpotOutputDTO) {
        this.bukpotOutput = bukpotOutput;
    }
}

export class CountNettoInputVM {
    nettoInput: CountNettoInputDTO;

    constructor(nettoInput: CountNettoInputDTO) {
        this.nettoInput = nettoInput;
    }
}

export class CountNettoOutputVM {
    nettoOutput: CountNettoOutputDTO;

    constructor(nettoOutput: CountNettoOutputDTO) {
        this.nettoOutput = nettoOutput;
    }
}