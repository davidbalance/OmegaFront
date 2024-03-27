type CreateMedicalReportValue = {
    name: string;
    type: string;
    value: string;
}

export type CreateMedicalReportRequestDTO = {
    doctor: number;
    result: number;
    values: CreateMedicalReportValue[]
}