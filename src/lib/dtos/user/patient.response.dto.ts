import { User } from "./user.response.dto";

export interface Patient {
    id: number;
    birthday: Date;
    gender: string;
    user: User;
}

export interface GETPatientsResponseDto {
    patients: Patient[];
}