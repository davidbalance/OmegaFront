'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { CreateResourcePayload, EditResourcePayload, RemoveResourcePayload, Resource } from "./server-types";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

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

const createResource = async (payload: CreateResourcePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createResource');

    revalidateTag('retriveResources');
}

const editResource = async (payload: EditResourcePayload): Promise<void> => {
    const { resourceId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ resourceId })
        .addBody({ ...body })
        .execute('editResource');

    revalidateTag('retriveResources');
}

const removeResource = async (payload: RemoveResourcePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeResource');

    revalidateTag('retriveResources');
}

export const serverActionCreateResource = withResult(createResource);
export const serverActionEditResource = withResult(editResource);
export const serverActionRemoveResource = withResult(removeResource);