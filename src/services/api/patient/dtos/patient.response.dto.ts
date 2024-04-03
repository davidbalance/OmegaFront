type User = {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
}

export type Patient = {
    id: number;
    birthday: Date;
    gender: "male" | "female";
    user: User;
}

export type FindPatientRS = Patient;

export type FindPatientsRS = {
    patients: Patient[];
}