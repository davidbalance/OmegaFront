import { User } from "./user.response.dto";

export interface Doctor {
    id: number;
    user: User & { hasCredential: boolean }
}

export interface GETDoctorArrayResponseDto {
    doctors: Doctor[];
}

export interface PATCHDoctorSignatureResponseDto { }