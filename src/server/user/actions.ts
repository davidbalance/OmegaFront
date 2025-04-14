'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { register } from "@/lib/auth/auth.utils";
import { AuthRegisterPayload } from "@/lib/auth/auth.types";
import { AddAuthPayload, AddUserResourcesPayload, EditUserPayload, User, UserAuthResource, UserInstrospect, UserQuery } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

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

const createUser = async (payload: AuthRegisterPayload): Promise<void> => {
    const session = await auth();
    await register(payload, session.access_token);
}

const editUser = async (payload: EditUserPayload): Promise<void> => {
    const { userId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .addBody({ ...body })
        .execute('editUser');

    revalidateTag('retriveUsers');
}

const addAuthUser = async (payload: AddAuthPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addAuthUser');
}

const addUserResource = async (payload: AddUserResourcesPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addUserResource');

    revalidateTag('retriveUserResources');
}

const removeUser = async (userId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .execute('removeUser');

    revalidateTag('retriveUsers');
}

export const serverActionCreateUser = withResult(createUser);
export const serverActionEditUser = withResult(editUser);
export const serverActionAddAuthUser = withResult(addAuthUser);
export const serverActionAddUserResource = withResult(addUserResource);
export const serverActionRemoveUser = withResult(removeUser);