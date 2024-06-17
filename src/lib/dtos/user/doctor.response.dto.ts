import { User } from "./user.response.dto";

export interface Doctor {
    id: number;
    user: User & { hasCredential: boolean }
}

export interface GETDoctorsResponseDto {
    doctors: Doctor[];
}