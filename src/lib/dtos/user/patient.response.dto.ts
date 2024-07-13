import { User } from "./user.response.dto";

export interface PatientPlain extends Omit<User, 'id'> {
    id: number;
    birthday: Date;
    gender: string;
    user: number;
}

export interface Patient {
    id: number;
    birthday: Date;
    gender: string;
    user: User;
}

export interface GETPatientArrayResponseDto {
    patients: Patient[];
}

export interface GETPatientArrayWithPaginationResponseDto extends GETPatientArrayResponseDto {
    pages: number;
    patients: Patient[];
}