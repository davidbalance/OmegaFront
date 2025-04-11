'use server'

import auth from "@/lib/auth";
import { CreateDiseasePayload, Disease, DiseaseQuery, EditDiseasePayload, MoveDiseasePayload, RemoveDiseasePayload } from "./server-types"
import omega from "@/lib/api-client/omega-client/omega";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const serverActionRetriveDiseases = async (payload: DiseaseQuery): Promise<PaginationResponse<Disease>> => {
    const { groupId, ...query } = payload;
    const session = await auth();
    const diseases: PaginationResponse<Disease> = await omega()
        .addToken(session.access_token)
        .addParams({ groupId })
        .addQuery({ ...query })
        .execute('retriveDiseases');
    return diseases;
}

export const serverActionRetriveDisease = async (diseaseId: string): Promise<Disease> => {
    const session = await auth();
    const diseases: Disease = await omega()
        .addToken(session.access_token)
        .addParams({ diseaseId })
        .execute('retriveDisease');
    return diseases;
}

export const serverActionCreateDisease = async (payload: CreateDiseasePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(payload)
        .execute('createDisease');

    revalidateTag('retriveDiseases');
}

export const serverActionEditDisease = async (payload: EditDiseasePayload): Promise<void> => {
    const { diseaseId, groupId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ diseaseId, groupId })
        .addBody(body)
        .execute('editDisease');

    revalidateTag('retriveDiseases');
}

export const serverActionMoveDiseaseToGroup = async (payload: MoveDiseasePayload): Promise<void> => {
    const { diseaseId, fromGroupId, toGroupId } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ diseaseId, groupId: fromGroupId })
        .addBody({ toGroupId })
        .execute('moveDiseaseToGroup');

    revalidateTag('retriveDiseases');
}

export const serverActionRemoveDisease = async (payload: RemoveDiseasePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams(payload)
        .execute('removeDisease');

    revalidateTag('retriveDiseases');
}
