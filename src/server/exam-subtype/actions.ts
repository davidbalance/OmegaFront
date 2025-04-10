'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { CreateExamSubtypePayload, EditExamSubtypePayload, ExamSubtype, ExamSubtypeQuery, MoveExamSubtypePayload, RemoveExamSubtypePayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const serverActionRetriveExamSubtypes = async (payload: ExamSubtypeQuery): Promise<PaginationResponse<ExamSubtype>> => {
    const { typeId, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<ExamSubtype> = await omega()
        .addToken(session.access_token)
        .addParams({ typeId })
        .addQuery({ ...query })
        .execute('retriveExamSubtypes');
    return data;
}

export const serverActionRetriveExamSubtype = async (subtypeId: string): Promise<ExamSubtype> => {
    const session = await auth();
    const data: ExamSubtype = await omega()
        .addToken(session.access_token)
        .addParams({ subtypeId })
        .execute('retriveExamSubtype');
    return data;
}

export const serverActionCreateExamSubtype = async (payload: CreateExamSubtypePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createExamSubtype');

    revalidateTag('retriveExamSubtypes');
}

export const serverActionEditExamSubtype = async (payload: EditExamSubtypePayload): Promise<void> => {
    const { subtypeId, typeId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ subtypeId, typeId })
        .addBody({ ...body })
        .execute('editExamSubtype');

    revalidateTag('retriveExamSubtypes');
}

export const serverActionMoveExamSubtype = async (payload: MoveExamSubtypePayload): Promise<void> => {
    const { typeId, subtypeId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ subtypeId, typeId })
        .addBody({ ...body })
        .execute('moveExamSubtype');

    revalidateTag('retriveExamSubtypes');
}

export const serverActionRemoveExamSubtype = async (payload: RemoveExamSubtypePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeExamSubtype');

    revalidateTag('retriveExamSubtypes');
}
