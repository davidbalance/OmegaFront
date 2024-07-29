import { User } from "../user/base.response.dto";

export interface Patient extends Omit<User, 'email'> {
    birthday: Date;
    gender: string;
    user: number;
}

export interface PatientEeq extends Patient {
    role: string;
}