'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { CreateDiseaseGroupPayload, DiseaseGroup, DiseaseGroupOption, DiseaseGroupQuery, EditDiseaseGroupPayload, RemoveDiseaseGroupPayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveDiseaseGroups = async (query: DiseaseGroupQuery): Promise<PaginationResponse<DiseaseGroup>> => {
    const session = await auth();
    const data: PaginationResponse<DiseaseGroup> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveDiseaseGroups');
    return data;
}

export const serverActionRetriveDiseaseGroup = async (groupId: string): Promise<DiseaseGroup> => {
    const session = await auth();
    const data: DiseaseGroup = await omega()
        .addToken(session.access_token)
        .addParams({ groupId })
        .execute('retriveDiseaseGroup');
    return data;
}

export const serverActionRetriveDiseaseGroupOptions = async (): Promise<DiseaseGroupOption[]> => {
    const session = await auth();
    const data: DiseaseGroupOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveDiseaseGroupOptions');
    return data;
}

const createDiseaseGroup = async (payload: CreateDiseaseGroupPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(payload)
        .execute('createDiseaseGroup');

    revalidateTag('retriveDiseaseGroups');
}

const editDiseaseGroup = async (payload: EditDiseaseGroupPayload): Promise<void> => {
    const { groupId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ groupId })
        .addBody(body)
        .execute('editDiseaseGroup');

    revalidateTag('retriveDiseaseGroups');
}

const removeDiseaseGroup = async (payload: RemoveDiseaseGroupPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams(payload)
        .execute('removeDiseaseGroup');

    revalidateTag('retriveDiseaseGroups');
}

export const serverActionCreateDiseaseGroup = withResult(createDiseaseGroup);
export const serverActionEditDiseaseGroup = withResult(editDiseaseGroup);
export const serverActionRemoveDiseaseGroup = withResult(removeDiseaseGroup);