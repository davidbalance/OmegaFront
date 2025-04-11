'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Branch, BranchCreatePayload, BranchMovePayload, BranchQuery, BranchRemovePayload } from "./server-types";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveBranches = async (payload: BranchQuery): Promise<Branch[]> => {
    const { companyId, ...query } = payload;
    const session = await auth();
    const data: Branch[] = await omega()
        .addToken(session.access_token)
        .addParams({ companyId })
        .addQuery({ ...query })
        .execute('retriveBranches');
    return data;
}

const createBranch = async (payload: BranchCreatePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createBranch');

    revalidateTag('retriveBranches');
}

const moveBranch = async (payload: BranchMovePayload): Promise<void> => {
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

const removeBranch = async (payload: BranchRemovePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeBranch');

    revalidateTag('retriveBranches');
}


export const serverActionCreateBranch = withResult(createBranch);
export const serverActionMoveBranch = withResult(moveBranch);
export const serverActionRemoveBranch = withResult(removeBranch);