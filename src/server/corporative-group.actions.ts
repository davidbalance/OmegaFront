'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { CorporativeGroup, CorporativeGroupOption } from "@/lib/dtos/location/corporative/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveCorporativeGroupOptions = async (): Promise<CorporativeGroupOption[]> => {
    const session = await auth();
    const { data }: ObjectArray<CorporativeGroupOption> = await omega()
        .addToken(session.access_token)
        .execute('corporativeGroupOptions');
    return data;
}

export const searchCorporativeGroup = async (filter: FilterMeta): Promise<CorporativeGroup[]> => {
    const session = await auth();
    const { data }: ObjectArray<CorporativeGroup> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('corporativeGroupSearch');
    return data;
}

export const countCorporativeGroup = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('corporativeGroupPages');
    return pages;
}