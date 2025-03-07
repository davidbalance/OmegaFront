'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Branch, BranchQuery } from "./server_types";

export const retriveBranches = async (payload: BranchQuery): Promise<Branch[]> => {
    const { companyId, ...query } = payload;
    const session = await auth();
    const data: Branch[] = await omega()
        .addToken(session.access_token)
        .addParams({ companyId })
        .addQuery({ ...query })
        .execute('retriveBranches');
    return data;
}