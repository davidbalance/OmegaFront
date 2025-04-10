'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { register } from "@/lib/auth/auth.utils";
import { AuthRegisterPayload } from "@/lib/auth/auth.types";
import { AddAuthPayload, AddUserResourcesPayload, EditUserPayload, User, UserAuthResource, UserInstrospect, UserQuery } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const serverActionFindMe = async (): Promise<UserInstrospect> => {
    const session = await auth();
    const data: UserInstrospect = await omega()
        .addToken(session.access_token)
        .execute('findMe');
    return data;
}

export const serverActionRetriveUsers = async (query: UserQuery): Promise<PaginationResponse<User>> => {
    const session = await auth();
    const data: PaginationResponse<User> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveUsers');
    return data;
}

export const serverActionRetriveUser = async (userId: string): Promise<User> => {
    const session = await auth();
    const data: User = await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .execute('retriveUser');
    return data;
}

export const serverActionRetriveUserResources = async (userId: string): Promise<UserAuthResource[]> => {
    const session = await auth();
    const data: UserAuthResource[] = await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .execute('retriveUserResources');
    return data;
}

export const serverActionCreateUser = async (payload: AuthRegisterPayload): Promise<void> => {
    const session = await auth();
    await register(payload, session.access_token);
}

export const serverActionEditUser = async (payload: EditUserPayload): Promise<void> => {
    const { userId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .addBody({ ...body })
        .execute('editUser');

    revalidateTag('retriveUsers');
}

export const serverActionAddAuthUser = async (payload: AddAuthPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addAuthUser');
}

export const serverActionAddUserResource = async (payload: AddUserResourcesPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addUserResource');

    revalidateTag('retriveUserResources');
}

export const serverActionRemoveUser = async (userId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .execute('removeUser');

    revalidateTag('retriveUsers');
}