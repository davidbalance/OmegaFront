'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { CorporativeQuery, Corporative, CorporativeOption, CorporativeCreatePayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveCorporatives = async (query: CorporativeQuery): Promise<PaginationResponse<Corporative>> => {
    const session = await auth();
    const data: PaginationResponse<Corporative> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveCorporatives');

    return data;
}

export const serverActionRetriveCorporativesOptions = async (): Promise<CorporativeOption[]> => {
    const session = await auth();
    const data: CorporativeOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveCorporativesOptions');

    return data;
}

const createCorporative = async (payload: CorporativeCreatePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createCorporative');

    revalidateTag('retriveCorporatives');
}

const removeCorporative = async (corporativeId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ corporativeId })
        .execute('removeCorporative');

    revalidateTag('retriveCorporatives');
}

export const serverActionCreateCorporative = withResult(createCorporative);
export const serverActionRemoveCorporative = withResult(removeCorporative);