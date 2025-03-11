'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { CreateResourcePayload, EditResourcePayload, RemoveResourcePayload, Resource } from "./server_types";
import { revalidateTag } from "next/cache";

export const retriveResources = async (): Promise<Resource[]> => {
    const session = await auth();
    const data: Resource[] = await omega()
        .addToken(session.access_token)
        .execute('retriveResources');
    return data;
}

export const retriveResource = async (resourceId: string): Promise<Resource> => {
    const session = await auth();
    const data: Resource = await omega()
        .addParams({ resourceId })
        .addToken(session.access_token)
        .execute('retriveResource');
    return data;
}

export const createResource = async (payload: CreateResourcePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createResource');

    revalidateTag('retriveResources');
}

export const editResource = async (payload: EditResourcePayload): Promise<void> => {
    const { resourceId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ resourceId })
        .addBody({ ...body })
        .execute('editResource');

    revalidateTag('retriveResources');
}

export const removeResource = async (payload: RemoveResourcePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeResource');

    revalidateTag('retriveResources');
}
