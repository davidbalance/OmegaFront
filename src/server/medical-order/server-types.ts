import { Order, Pagination } from "@/lib/types/pagination.type";

export type Process = {
    orderProcess: string;
}

export type Year = {
    orderYear: number;
}

export type OrderStatus = 'created' | 'validated';

export type MedicalOrder = {
    orderId: string;
    orderMail: boolean,
    orderProcess: string;
    orderEmissionDate: Date;
    orderStatus: OrderStatus;
}

export type MedicalOrderQuery = {
    patientDni: string;
    filter?: string;
} & Order<MedicalOrder> & Pagination;

export type MedicalOrderDoctor = MedicalOrder & {
    orderLeftReport: number;
}

export type MedicalOrderPatient = {
    orderId: string;
    orderMail: boolean,
    orderProcess: string;
    orderEmissionDate: Date;
    orderStatus: OrderStatus;
    patientName: string;
    patientLastname: string;
    patientDni: string;
    locationCorporative: string;
    locationCompanyRuc: string;
    locationCompanyName: string;
    locationBranchName: string;
}

export type MedicalOrderPatientQuery = {
    filter?: string;
} & Order<MedicalOrderPatient> & Pagination;

export type MedicalCloudFile = {
    testId: string;
    patientDni: string;
    patientFullname: string;
    examName: string;
    resultHasFile: boolean;
    reportHasContent: boolean;
}

export type MedicalChecklist = {
    testId: string;
    testCheck: boolean;
    examName: string;
    patientDni: string;
    patientName: string;
    patientLastname: string;
    orderId: string;
    orderProcess: string;
    orderEmissionDate: Date;
    locationCompanyRuc: string;
    locationCompanyName: string;
    locationJobPosition?: string;
}

export type CreateMedicalOrderPayload = {
    patientDni: string;
    corporativeName: string;
    companyRuc: string;
    companyName: string;
    branchName: string;
    doctorDni: string;
    doctorFullname: string;
    process: string;
    year: number;
}

export type UpdateMedicalOrderProcessPayload = {
    orderId: string;
    process: string;
}

export type SendMedicalOrderPayload = {
    orderId: string;
    email: string;
}