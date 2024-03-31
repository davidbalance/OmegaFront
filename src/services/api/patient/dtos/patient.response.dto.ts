export type Patient = {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
    gender: "male" | "female";
    birthday: Date;
    age: number;
}

export type FindPatientsRS = {
    patients: Patient[];
}