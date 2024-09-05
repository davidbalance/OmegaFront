'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamSingleSubtype } from "@/lib/dtos/laboratory/exam/subtype/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchExamSubtypes = async (type: number, filter: FilterMeta): Promise<ExamSingleSubtype[]> => {
    console.log('search', filter);
    const session = await auth();
    const { data }: ObjectArray<ExamSingleSubtype> = await omega()
        .addParams({ type })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSubtypeSearch');
    return data;
}

export const countExamSubtypes = async (type: number, filter: CountMeta): Promise<number> => {
    console.log('count', filter);
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ type })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSubtypePages');
    return pages;
}

/* export const retriveExamSubtype = async (exam: string): Promise<ExamSingleSubtype[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<ExamSingleSubtype> = await omega()
        .addParams({ exam })
        .addToken(session.access_token)
        .execute('examsubtypeDetails');
    return data;
} */