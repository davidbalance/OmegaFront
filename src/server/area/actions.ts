'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { Area, AreaOption, AreaQuery, CreateAreaPayload, EditAreaPayload, RemoveAreaPayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveAreas = async (query: AreaQuery): Promise<PaginationResponse<Area>> => {
    const session = await auth();
    const data: PaginationResponse<Area> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveAreas');
    return data;
}

export const serverActionRetriveArea = async (areaId: string): Promise<Area> => {
    const session = await auth();
    const data: Area = await omega()
        .addToken(session.access_token)
        .addParams({ areaId })
        .execute('retriveArea');
    return data;
}

export const serverActionRetriveAreaOptions = async (): Promise<AreaOption[]> => {
    const session = await auth();
    const data: AreaOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveAreaOptions');
    return data;
}

const createArea = async (payload: CreateAreaPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(payload)
        .execute('createArea');

    revalidateTag('retriveAreas');
}

const editArea = async (payload: EditAreaPayload): Promise<void> => {
    const { areaId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ areaId })
        .addBody(body)
        .execute('editArea');

    revalidateTag('retriveAreas');
}

const removeArea = async (payload: RemoveAreaPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeArea');

    revalidateTag('retriveAreas');
}


export const serverActionCreateArea = withResult(createArea);
export const serverActionEditArea = withResult(editArea);
export const serverActionRemoveArea = withResult(removeArea);