import { GetTerPPhByIncomeInputDTO } from "../dtos/ter_pph.dto";

export class GetTerPPhByIncomeInputVM {
    input: GetTerPPhByIncomeInputDTO;

    constructor(input: GetTerPPhByIncomeInputDTO) {
        this.input = input;
    }
}