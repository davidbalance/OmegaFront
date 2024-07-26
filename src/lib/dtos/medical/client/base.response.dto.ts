import { MedicalClientEmail } from "./email/base.response.dto";

export interface MedicalClient {
    dni: string;
    fullname: string;
    managementId?: number;
    managementName?: string;
    areaId?: number;
    areaName?: string;
    email: MedicalClientEmail[];
}