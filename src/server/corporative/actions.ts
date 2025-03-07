'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { CorporativeQuery, Corporative, CorporativeOption } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";

export const retriveCorporatives = async (query: CorporativeQuery): Promise<PaginationResponse<Corporative>> => {
    const session = await auth();
    const data: PaginationResponse<Corporative> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveCorporatives');

    return data;
}

export const retriveCorporativesOptions = async (): Promise<CorporativeOption[]> => {
    const session = await auth();
    const data: CorporativeOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveCorporativesOptions');

    return data;
}