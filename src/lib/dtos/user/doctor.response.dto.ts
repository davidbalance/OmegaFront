import { User } from "@/services/api/user/dtos";

export interface Doctor {
    id: number;
    user: User & { hasCredential: boolean }
}

export interface GETDoctorsResponseDto {
    doctors: Doctor[];
}