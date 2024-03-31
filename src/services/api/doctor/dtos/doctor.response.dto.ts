export type Doctor = {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
    signature?: string;
}

export type FindDoctorsRS = {
    doctors: Doctor[];
}