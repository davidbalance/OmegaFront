export type MedicalReportValue = {
    name: string;
    value: string;
}

export type MedicalReportModel = {
    id: number;
    doctorDNI: string;
    doctorFullname: string;
    doctorSignature: string;
    values: MedicalReportValue[]
}