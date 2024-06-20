export interface CountBukpotInputDTO {
    employee_id: number;
    ptkp_id: number;
    year: number;
}

export interface CountBukpotOutputDTO {
    gaji: number;
    tunjangan_pph: number;
    tunjangan_lain_uang_lembur: number;
    honorarium: number;
    asuransi_diberi_pekerja: number;
    natura: number;
    bonus: number;
    biaya_jabatan: number;
    iuran_pensiun_asuransi_sendiri: number;
    penghasilan_netto: number;
    ptkp: number;
    pkp: number;
    amal_amount: number;
    yearly_pph21: number;
    last_month_pph21: number;
    paid_pph21: number;
    is_last_month: boolean;
}

export interface CountNettoInputDTO {
    ptkp_id: number;
    penghasilan_netto: number;
}

export interface CountNettoOutputDTO {
    ptkp: number;
    pkp: number;
    yearly_pph21: number;
}
