'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { CorporativeQuery, Corporative, CorporativeOption, CorporativeCreatePayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

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

export const serverActionCreateCorporative = async (payload: CorporativeCreatePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createCorporative');

    revalidateTag('retriveCorporatives');
}

export const serverActionRemoveCorporative = async (corporativeId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ corporativeId })
        .execute('removeCorporative');

    revalidateTag('retriveCorporatives');
}
