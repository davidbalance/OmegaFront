import { UserModel } from ".";

export type DoctorModel = {
    id: number;
    signature: string;
    user: UserModel;
}

export type DoctorFullModel = Omit<UserModel, 'id'> & DoctorModel;