'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Company, CompanyCreatePayload, CompanyMovePayload, CompanyQuery, CompanyRemovePayload } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const retriveCompanies = async (payload: CompanyQuery): Promise<PaginationResponse<Company>> => {
    const { corporativeId, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<Company> = await omega()
        .addToken(session.access_token)
        .addParams({ corporativeId })
        .addQuery({ ...query })
        .execute('retriveCompanies');

    return data;
}

export const createCompany = async (payload: CompanyCreatePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createCompany');

    revalidateTag('retriveCompanies');
}

export const moveCompany = async (payload: CompanyMovePayload): Promise<void> => {
    const { companyId, fromCorporativeId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({
            corporativeId: fromCorporativeId,
            companyId: companyId
        })
        .addBody({ ...body })
        .execute('moveCompany');

    revalidateTag('retriveCompanies');
}

export const removeCompany = async (payload: CompanyRemovePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeCompany');

    revalidateTag('retriveCompanies');
}