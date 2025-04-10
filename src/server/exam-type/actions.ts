'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamType, ExamTypeOption, ExamTypeQuery } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";

export const serverActionRetriveExamTypes = async (query: ExamTypeQuery): Promise<PaginationResponse<ExamType>> => {
    const session = await auth();
    const data: PaginationResponse<ExamType> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveExamTypes');
    return data;
}

export const serverActionRetriveExamTypesOptions = async (): Promise<ExamTypeOption[]> => {
    const session = await auth();
    const data: ExamTypeOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveExamTypesOptions');
    return data;
}
