import { CountHourSalaryBlueOutputDTO, CountHourSalaryWhiteInputDTO, CountSalaryBlueInputDTO, CountSalaryBlueOutputDTO, CountSalarySlipInputDTO, CountSalarySlipOutputDTO, CountSalaryWhiteOutputDTO } from "../dtos/salary_slip.dto";

export class CountSalaryBlueInputVM {
    countInput: CountSalaryBlueInputDTO;

    constructor(countInput: CountSalaryBlueInputDTO) {
        this.countInput = countInput;
    }
}

export class CountSalaryBlueOutputVM {
    countOutput: CountSalaryBlueOutputDTO;

    constructor(countOutput: CountSalaryBlueOutputDTO) {
        this.countOutput = countOutput;
    }
}

export class CountSalaryBlueVM {
    input: CountSalaryBlueInputVM;
    output: CountSalaryBlueOutputVM

    constructor(input: CountSalaryBlueInputVM, output: CountSalaryBlueOutputVM) {
        this.input = input;
        this.output = output;
    }
}

export class CountSalaryWhiteOutputVM {
    countOutput: CountSalaryWhiteOutputDTO;

    constructor(countOutput: CountSalaryWhiteOutputDTO) {
        this.countOutput = countOutput;
    }
}

export class CountSalarySlipInputVM {
    countInput: CountSalarySlipInputDTO;

    constructor(countInput: CountSalarySlipInputDTO) {
        this.countInput = countInput;
    }
}

export class CountSalarySlipOutputVM {
    countOutput: CountSalarySlipOutputDTO;

    constructor(countOutput: CountSalarySlipOutputDTO) {
        this.countOutput = countOutput;
    }
}

export class CountSalarySlipVM {
    input: CountSalarySlipInputVM;
    output: CountSalarySlipOutputVM

    constructor(input: CountSalarySlipInputVM, output: CountSalarySlipOutputVM) {
        this.input = input;
        this.output = output;
    }
}

export class CountHourSalaryWhiteOuputVM {
    countInput: CountHourSalaryWhiteInputDTO;

    constructor(countInput: CountHourSalaryWhiteInputDTO) {
        this.countInput = countInput;
    }
}

export class CountHourSalaryBlueOutputVM {
    countInput: CountHourSalaryBlueOutputDTO;

    constructor(countInput: CountHourSalaryBlueOutputDTO) {
        this.countInput = countInput;
    }
}