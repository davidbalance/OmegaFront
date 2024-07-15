import { MedicalClient, MedicalClientEmail } from "../client/response.dto";
import { MedicalResult } from "../result/response.dto";

export type OrderStatus = "created" | "validated";

export interface MedicalOrder {
    id: number;
    process: string;
    createAt: Date;
    mailStatus: boolean;
    orderStatus: OrderStatus;
    results: MedicalResult[];
    client: MedicalClient
}

export interface GETMedicalOrderResponseDto extends MedicalOrder { }

export interface GETMedicalOrderArrayResponseDto {
    orders: MedicalOrder[];
}

export interface MedicalOrderFile {
    id: number;
    examName: string;
    type: string;
}

export interface GETMedicalMedicalOrderFileResponseDto {
    dni: string;
    fullname: string;
    email: string;
    fileResults: MedicalOrderFile[];
    fileReports: MedicalOrderFile[];
}

export interface PlainMedicalOrder {
    id: number;
    process: string;
    createAt: Date;
    mailStatus: boolean;
    orderStatus: OrderStatus;
    dni: string;
    fullname: string;
    results: MedicalResult[];
    email: MedicalClientEmail[];
}

export interface GETPlainMedicalOrderArrayResponseDto {
    orders: PlainMedicalOrder[];
}

export interface GETArrayWithPaginationResponseDto extends GETPlainMedicalOrderArrayResponseDto {
    pages: number;
}