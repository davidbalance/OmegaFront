import { UserModel } from ".";

export type DoctorModel = {
    id: number;
    signature: string;
    user: UserModel;
}