'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Company, CompanyCreatePayload, CompanyMovePayload, CompanyQuery, CompanyRemovePayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveCompanies = async (payload: CompanyQuery): Promise<PaginationResponse<Company>> => {
    const { corporativeId, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<Company> = await omega()
        .addToken(session.access_token)
        .addParams({ corporativeId })
        .addQuery({ ...query })
        .execute('retriveCompanies');

    return data;
}

const createCompany = async (payload: CompanyCreatePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createCompany');

    revalidateTag('retriveCompanies');
}

const moveCompany = async (payload: CompanyMovePayload): Promise<void> => {
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

const removeCompany = async (payload: CompanyRemovePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeCompany');

    revalidateTag('retriveCompanies');
}

export const serverActionCreateCompany = withResult(createCompany);
export const serverActionMoveCompany = withResult(moveCompany);
export const serverActionRemoveCompany = withResult(removeCompany);