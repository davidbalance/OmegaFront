'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { CreateManagementPayload, EditManagementPayload, Management, ManagementOption, ManagementQuery, RemoveManagementPayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const serverActionRetriveManagements = async (query: ManagementQuery): Promise<PaginationResponse<Management>> => {
    const session = await auth();
    const data: PaginationResponse<Management> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveManagements');
    return data;
}

export const serverActionRetriveManagement = async (managementId: string): Promise<Management> => {
    const session = await auth();
    const data: Management = await omega()
        .addToken(session.access_token)
        .addParams({ managementId })
        .execute('retriveManagement');
    return data;
}

export const serverActionRetriveManagementOptions = async (): Promise<ManagementOption[]> => {
    const session = await auth();
    const data: ManagementOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveManagementOptions');
    return data;
}

export const serverActionCreateManagement = async (payload: CreateManagementPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createManagement');

    revalidateTag('retriveManagements');
}

export const serverActionEditManagement = async (payload: EditManagementPayload): Promise<void> => {
    const { managementId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ managementId })
        .addBody(body)
        .execute('editManagement');

    revalidateTag('retriveManagements');
}

export const serverActionRemoveManagement = async (payload: RemoveManagementPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams(payload)
        .execute('removeManagement');

    revalidateTag('retriveManagements');
}
