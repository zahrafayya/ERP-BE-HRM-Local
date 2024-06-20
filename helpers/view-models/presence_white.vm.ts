import { CountPresenceWhiteInputDTO } from "../dtos/presence_white.dto";

export class CountPresenceWhiteInputVM {
    bukpotInput: CountPresenceWhiteInputDTO;

    constructor(bukpotInput: CountPresenceWhiteInputDTO) {
        this.bukpotInput = bukpotInput;
    }
}