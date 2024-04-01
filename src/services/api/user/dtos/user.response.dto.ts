import { User } from "@/lib";

export type FindUsersRS = {
    users: User[];
}

export type CreateUserRS = {
    user: number;
}