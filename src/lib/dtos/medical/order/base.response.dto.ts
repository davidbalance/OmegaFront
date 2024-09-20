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
    hasFile: boolean;
    fileResults: MedicalOrderCloudFile[];
    fileReports: MedicalOrderCloudFile[];
}

export type OrderStatus = "created" | "validated";

export interface MedicalOrder {
    id: number;
    process: string;
    hasFile: boolean;
    createAt: Date;
    mailStatus: boolean;
    orderStatus: OrderStatus;
}

export interface MedicalOrderDoctor extends MedicalOrder {
    leftReports: number;
}

export interface MedicalOrderExpanded extends MedicalOrder {
    name: string;
    lastname: string;
    dni: string;
    companyRuc: string;
    companyName: string;
}