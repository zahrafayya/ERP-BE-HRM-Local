export interface CountSalaryBlueInputDTO {
    employee_id: number;
    gaji_pokok: number;
    penalti: number;
    tunjangan_lain: number;
    work_hour: number;
    start_date: Date;
    last_date: Date;
}

export interface CountSalaryBlueOutputDTO {
    gaji_pokok: number;
    deduction_asuransi_pribadi: number;
    deduction_amal: number;
    deduction_pph21: number;
    penghasilanTetap: number;
    penghasilanBruto: number;
    takeHomePay: number;
}

export interface CountSalaryWhiteOutputDTO {
    baseSalary: number,
    penalti: number,
    bonusOvertimeHariKerja: number,
    bonusOvertimeHariLibur: number,
    bonusOvertimeHariLiburNasional: number,
    salary: number
}

export interface CountSalarySlipInputDTO {
    employee_id: number;
    gaji_pokok: number;
    tunjangan_lain: number;
    penalti: number;
    gaji_lembur: number;
    month: number;
    year: number;
}

export interface CountSalarySlipOutputDTO {
    gaji_pokok: number;
    tunjangan_tetap_position: number;
    tunjangan_tetap_ptkp: number;
    benefit_bpjs_kesehatan: number;
    benefit_bpjs_tk_jht: number;
    benefit_bpjs_tk_jkk: number;
    benefit_bpjs_tk_jkm: number;
    benefit_bpjs_tk_jp: number;
    deduction_asuransi_pribadi: number;
    deduction_amal: number;
    deduction_bpjs_kesehatan: number;
    deduction_bpjs_tk_jht: number;
    deduction_bpjs_tk_jp: number;
    deduction_pph21: number;
    penghasilanTetap: number;
    penghasilanBruto: number;
    takeHomePay: number;
}

export interface CountHourSalaryWhiteInputDTO {
    workNormalHour: number;
    penaltiHours: number;
    overtimeHariKerjaHours: number;
    overtimeHariLiburHours: number;
    overtimeLiburNasionalHours: number;
}

export interface CountHourSalaryBlueOutputDTO {
    work_hour: number;
    work_hour_salary: number;
    penalty_hour_salary: number;
}