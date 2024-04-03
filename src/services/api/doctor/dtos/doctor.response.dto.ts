type User = {
    id: number;
    dni: string;
    email: string;
    name: string;
    lastname: string;
}

export type Doctor = {
    id: number;
    signature?: string;
    user: User;
}

export type FindDoctorsRS = {
    doctors: Doctor[];
}