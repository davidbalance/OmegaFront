'use server'

import auth from "@/lib/auth";
import { CreateDiseasePayload, Disease, DiseaseQuery, EditDiseasePayload, MoveDiseasePayload, RemoveDiseasePayload } from "./server-types"
import omega from "@/lib/api-client/omega-client/omega";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

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

const createDisease = async (payload: CreateDiseasePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(payload)
        .execute('createDisease');

    revalidateTag('retriveDiseases');
}

const editDisease = async (payload: EditDiseasePayload): Promise<void> => {
    const { diseaseId, groupId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ diseaseId, groupId })
        .addBody(body)
        .execute('editDisease');

    revalidateTag('retriveDiseases');
}

const moveDiseaseToGroup = async (payload: MoveDiseasePayload): Promise<void> => {
    const { diseaseId, fromGroupId, toGroupId } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ diseaseId, groupId: fromGroupId })
        .addBody({ toGroupId })
        .execute('moveDiseaseToGroup');

    revalidateTag('retriveDiseases');
}

const removeDisease = async (payload: RemoveDiseasePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams(payload)
        .execute('removeDisease');

    revalidateTag('retriveDiseases');
}


export const serverActionCreateDisease = withResult(createDisease);
export const serverActionEditDisease = withResult(editDisease);
export const serverActionMoveDiseaseToGroup = withResult(moveDiseaseToGroup);
export const serverActionRemoveDisease = withResult(removeDisease);