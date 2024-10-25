'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Branch } from "@/lib/dtos/location/branch.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchBranch = async (company: number, filter: FilterMeta): Promise<Branch[]> => {
    const session = await auth();
    const { data }: ObjectArray<Branch> = await omega()
        .addParams({ company })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('branchSearch');
    return data;
}

export const countBranch = async (company: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ company })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('branchPages');
    return pages;
}