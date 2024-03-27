import { UserModel } from ".";

export type PatientModel = {
    id: number;
    gender: string;
    birthday: Date;
    age: number;
    user: UserModel;
}