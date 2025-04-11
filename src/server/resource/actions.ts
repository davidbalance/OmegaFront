'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { CreateResourcePayload, EditResourcePayload, RemoveResourcePayload, Resource } from "./server-types";
import { revalidateTag } from "next/cache";

export const serverActionRetriveResources = async (): Promise<Resource[]> => {
    const session = await auth();
    const data: Resource[] = await omega()
        .addToken(session.access_token)
        .execute('retriveResources');
    return data;
}

export const serverActionRetriveResource = async (resourceId: string): Promise<Resource> => {
    const session = await auth();
    const data: Resource = await omega()
        .addParams({ resourceId })
        .addToken(session.access_token)
        .execute('retriveResource');
    return data;
}

export const serverActionCreateResource = async (payload: CreateResourcePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createResource');

    revalidateTag('retriveResources');
}

export const serverActionEditResource = async (payload: EditResourcePayload): Promise<void> => {
    const { resourceId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ resourceId })
        .addBody({ ...body })
        .execute('editResource');

    revalidateTag('retriveResources');
}

export const serverActionRemoveResource = async (payload: RemoveResourcePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeResource');

    revalidateTag('retriveResources');
}
