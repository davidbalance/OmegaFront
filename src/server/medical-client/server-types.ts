import { Order, Pagination } from "@/lib/types/pagination.type";

export type MedicalClient = {
    patientDni: string;
    patientName: string;
    patientLastname: string;
    patientBirthday: Date,
    patientGender: 'male' | 'female',
    patientRole?: string;
    companyRuc: string;
}

export type MedicalClientQuery = {
    filter?: string;
} & Order<MedicalClient> & Pagination;

export type MedicalClientEmail = {
    emailId: string,
    emailValue: string,
    emailDefault: boolean,
    patientDni: string
}

export type MedicalAreaClient = {
    patientDni: string;
    areaId?: string;
    areaName?: string;
}

export type MedicalJobPositionClient = {
    patientDni: string;
    jobPosition: string;
}

export type MedicalManagementClient = {
    patientDni: string;
    managementId: string;
    managementName: string;
}

export type CreateMedicalClientPayload = {
    patientName: string;
    patientLastname: string;
    patientDni: string;
    patientEmail: string;
    patientGender: 'male' | 'female';
    patientBirthday: Date;
    patientRole?: string;
}

export type AddAreaMedicalClientPayload = {
    dni: string;
    areaId: string;
    areaName: string;
}

export type AddJobPositionMedicalClientPayload = {
    dni: string;
    jobPositionName: string;
}

export type AddManagementMedicalClientPayload = {
    dni: string;
    managementId: string;
    managementName: string;
}

export type ChangeRoleClientPayload = {
    dni: string;
    patientRole: string;
}

export type CreateClientEmailPayload = {
    patientDni: string;
    email: string;
}

export type DefaultClientEmailPayload = {
    patientDni: string;
    emailId: string;
}

export type RemoveClientEmailPayload = {
    patientDni: string;
    emailId: string;
}