'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Company } from "@/lib/dtos/location/company.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchCompany = async (group: number, filter: FilterMeta): Promise<Company[]> => {
    const session = await auth();
    const { data }: ObjectArray<Company> = await omega()
        .addParams({ group })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('companySearch');
    return data;
}

export const countCompany = async (group: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ group })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('companyPages');
    return pages;
}