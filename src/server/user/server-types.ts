import { Order, Pagination } from "@/lib/types/pagination.type";

export type User = {
    userId: string;
    userName: string;
    userLastname: string;
    userEmail: string;
    userDni: string;
}

export type UserInstrospect = {
    email: string,
    name: string,
    lastname: string,
    logo: string | null,
    resources: {
        label: string,
        address: string,
        icon: string
    }[],
    active: boolean
}

export type UserAuthResource = {
    resourceId: string;
    resourceLabel: string;
    resourceIcon: string;
}

export type UserQuery = {
    filter?: string;
} & Order<User> & Pagination;

export type AddAuthPayload = {
    userId: string;
    password: string;
}

export type AddUserResourcesPayload = {
    userId: string;
    resources: string[];
}

export type EditUserPayload = {
    userId: string;
    name: string;
    lastname: string;
}