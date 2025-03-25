'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Branch, BranchCreatePayload, BranchMovePayload, BranchQuery, BranchRemovePayload } from "./server_types";
import { revalidateTag } from "next/cache";

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

export const createBranch = async (payload: BranchCreatePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createBranch');

    revalidateTag('retriveBranches');
}

export const moveBranch = async (payload: BranchMovePayload): Promise<void> => {
    const { branchId, fromCompanyId, fromCorporativeId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({
            corporativeId: fromCorporativeId,
            companyId: fromCompanyId,
            branchId: branchId,
        })
        .addBody({ ...body })
        .execute('moveBranch');

    revalidateTag('retriveBranches');
}

export const removeBranch = async (payload: BranchRemovePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeBranch');

    revalidateTag('retriveBranches');
}
