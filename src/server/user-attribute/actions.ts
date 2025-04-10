'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { FindUserAttributePayload, AddUserAttributePayload, RemoveUserAttributePayload, UserAttribute } from "./server-types";
import { revalidateTag } from "next/cache";

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

export const serverActionAddUserAttribute = async (payload: AddUserAttributePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('addUserAttribute');

    revalidateTag('retriveUserAttribute');
}

export const serverActionRemoveUserAttribute = async (payload: RemoveUserAttributePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeUserAttribute');
}
