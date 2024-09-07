import { MedicalClientEmail } from "../client/email/base.response.dto";
import { MedicalResult } from "../result/base.response.dto";

export interface MedicalOrderCloudFile {
    id: number;
    examName: string;
    type: string;
    hasFile: boolean
}

export interface MedicalOrderCloud {
    dni: string;
    fullname: string;
    email: string;
    fileResults: MedicalOrderCloudFile[];
    fileReports: MedicalOrderCloudFile[];
}

export type OrderStatus = "created" | "validated";

export interface MedicalOrder {
    id: number;
    process: string;
    createAt: Date;
    mailStatus: boolean;
    orderStatus: OrderStatus;
}

export interface MedicalOrderExpanded extends MedicalOrder {
    name: string;
    lastname: string;
    dni: string;
    companyRuc: string;
    companyName: string;
}