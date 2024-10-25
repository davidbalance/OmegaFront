'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamType, ExamTypeOption } from "@/lib/dtos/laboratory/exam/type/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchExamType = async (filter: FilterMeta): Promise<ExamType[]> => {
    const session = await auth();
    const { data }: ObjectArray<ExamType> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examTypeSearch');
    return data;
}

export const countExamType = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examTypePages');
    return pages;
}

export const retriveExamTypeOptions = async (): Promise<ExamTypeOption[]> => {
    const session = await auth();
    const { data }: ObjectArray<ExamTypeOption> = await omega()
        .addToken(session.access_token)
        .execute('examTypeOptions');
    return data;
}