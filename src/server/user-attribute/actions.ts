'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { FindUserAttributePayload, AddUserAttributePayload, RemoveUserAttributePayload, UserAttribute } from "./server-types";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

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

export const serverActionAddUserAttribute = withResult(addUserAttribute);
export const serverActionRemoveUserAttribute = withResult(removeUserAttribute);