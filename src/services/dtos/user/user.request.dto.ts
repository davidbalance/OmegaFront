import { UserModel } from "@/services";

export type CreateUserRequestDTO = Omit<UserModel, 'id'> & {
    password: string;
};

export type FindOneAndUpdateRequestDTO = Partial<Omit<CreateUserRequestDTO, 'dni'>>;

export type UpdateDNIRequestDTO = {
    dni: string;
}
