import { CountHourPresenceBlueByStartLastDateInputDTO, CountHourPresenceBlueInputDTO, CountHourPresenceBlueOutputDTO } from "../dtos/presence_blue.dto";

export class CountHourPresenceBlueInputVM {
    bukpotInput: CountHourPresenceBlueInputDTO;

    constructor(bukpotInput: CountHourPresenceBlueInputDTO) {
        this.bukpotInput = bukpotInput;
    }
}

export class CountHourPresenceBlueOutputVM {
    bukpotOutput: CountHourPresenceBlueOutputDTO;

    constructor(bukpotOutput: CountHourPresenceBlueOutputDTO) {
        this.bukpotOutput = bukpotOutput;
    }
}

export class CountHourPresenceBlueByStartLastDateInputVM {
    countOutput: CountHourPresenceBlueByStartLastDateInputDTO;

    constructor(countOutput: CountHourPresenceBlueByStartLastDateInputDTO) {
        this.countOutput = countOutput;
    }
}