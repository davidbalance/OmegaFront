export type OrderResult = {
    id: number;
    examName: string;
    diseaseId?: number;
    diseaseName?: string;
    diseaseGroupId?: number;
    diseaseGroupName?: string;
}

export type Order = {
    id: number;
    patientDni: string;
    patientFullname: string;
    process: string;
    createAt: Date;
    mailStatus: boolean;
    results: OrderResult[];
}

export type FindOrdersRS = {
    orders: Order[];
}

export interface OrderFileDto {
    id: number;
    examName: string;
    type: 'result' | 'report';
}

export interface FindOrderFilesResponseDTO {
    dni: string;
    fullname: string;
    email: string;
    fileResults: OrderFileDto[];
    fileReports: OrderFileDto[];
}