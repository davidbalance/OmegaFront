import { MedicalResult } from "../result/response.dto";

export interface OrderFile {
    id: number;
    examName: string;
    type: string;
}

export interface GETOrderFilesResponseDto {
    dni: string;
    fullname: string;
    email: string;
    fileResults: OrderFile[];
    fileReports: OrderFile[];
}

export interface MedicalOrder {
    id: 0;
    patientDni: string;
    patientFullname: string;
    process: string;
    createAt: Date;
    mailStatus: boolean;
    results: Omit<MedicalResult, 'order'>[];
}

export interface GETMedicalOrderResponseDto {
    orders: MedicalOrder[];
}