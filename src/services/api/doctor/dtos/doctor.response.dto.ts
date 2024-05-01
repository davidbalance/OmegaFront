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
    user: User & { hasCredential: boolean };
}

export type FindDoctorsRS = {
    doctors: Doctor[];
}