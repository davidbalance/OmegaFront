'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { FindUserAttributePayload, AddUserAttributePayload, RemoveUserAttributePayload, UserAttribute, AddUserCompanyFilterPayload, RemoveUserCompanyFilterPayload, FindUserCompanyFilterPayload, UserCompanyFilter } from "./server-types";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";
import { PaginationResponse } from "@/lib/types/pagination.type";

export const serverActionRetriveUserAttribute = async (payload: FindUserAttributePayload): Promise<UserAttribute | null> => {
    const session = await auth();
    try {
        const data: UserAttribute = await omega()
            .addToken(session.access_token)
            .addParams({ ...payload })
            .execute('retriveUserAttribute');
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const serverActionRetriveUserCompanyFilter = async (payload: FindUserCompanyFilterPayload): Promise<PaginationResponse<UserCompanyFilter>> => {
    const session = await auth();
    const data: PaginationResponse<UserCompanyFilter> = await omega()
        .addParams({ ...payload })
        .addToken(session.access_token)
        .execute('retriveUserCompanyFilter');
    return data;
}

const addUserAttribute = async (payload: AddUserAttributePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addUserAttribute');

    revalidateTag('retriveUserAttribute');
}

const removeUserAttribute = async (payload: RemoveUserAttributePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeUserAttribute');
}

const addUserCompanyFilter = async (payload: AddUserCompanyFilterPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addUserCompanyFilter');

    revalidateTag('retriveUserCompanyFilter');
}

const removeUserCompanyFilter = async (payload: RemoveUserCompanyFilterPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeUserCompanyFilter');

    revalidateTag('retriveUserCompanyFilter');
}

export const serverActionAddUserAttribute = withResult(addUserAttribute);
export const serverActionRemoveUserAttribute = withResult(removeUserAttribute);
export const serverActionAddUserCompanyFilter = withResult(addUserCompanyFilter);
export const serverActionRemoveUserCompanyFilter = withResult(removeUserCompanyFilter);