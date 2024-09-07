'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { JobPosition } from "@/lib/dtos/location/job/position/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchJobPosition = async (filter: FilterMeta): Promise<JobPosition[]> => {
    const session = await auth();
    const { data }: ObjectArray<JobPosition> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('jobpositionSearch');
    return data;
}

export const countJobPosition = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('jobpositionPages');
    return pages;
}