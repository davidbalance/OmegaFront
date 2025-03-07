'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Company, CompanyQuery } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";

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