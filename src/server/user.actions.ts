'use server'

import omega from "@/lib/api-client/omega-client/omega";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { User } from "@/lib/dtos/user/user/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";
import { WebClientLogo } from "./web-client.actions";
import { CredentialBody } from "./credential.actions";
import auth from "@/lib/auth/auth";

export const searchUser = async (filter: FilterMeta): Promise<User[]> => {
    const session = await auth();
    const { data }: ObjectArray<User> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('userSearch');
    return data;
}

export const countUser = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('userPages');
    return pages;
}

export const retriveUser = async (id: number): Promise<User> => {
    const session = await auth();
    const data: User = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('userDetail');
    return data;
}

type UserBody = { name: string; lastname: string; email: string; dni: string; }
type WebClientResourceBody = { resources: number[]; }
type WebClientLogoBody = WebClientLogo;
type CreateUserBody = UserBody & CredentialBody & WebClientResourceBody & WebClientLogoBody;
export const createUser = async (data: CreateUserBody) => {
    const session = await auth();
    const userBody = data as UserBody;
    const credentialBody = data as CredentialBody;
    const resourcesBody = data as WebClientResourceBody;
    const logoBody = data as WebClientLogoBody;
    try {
        const { id: userId }: User = await omega()
            .addBody(userBody)
            .addToken(session.access_token)
            .execute('userCreate');

        await omega()
            .addBody({ ...credentialBody, user: userId })
            .addToken(session.access_token)
            .execute('credentialCreate');

        await omega()
            .addParams({ user: userId })
            .addBody(resourcesBody)
            .addToken(session.access_token)
            .execute('webClientResourceUpdate');

        await omega()
            .addParams({ user: userId })
            .addBody({ logo: Number(logoBody.logo) })
            .addToken(session.access_token)
            .execute('webClientLogoUpdate');
        revalidatePath('omega/admin/user')
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUser = async (id: number, body: Partial<Pick<UserBody, 'name' | 'lastname'>>) => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('userUpdate');
    revalidatePath(`/omega/admin/user/${id}/update`);
    revalidatePath('/omega/admin/user');
}

export const deleteUser = async (id: number) => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .execute('userDelete');
    revalidatePath('/omega/admin/user');
} 