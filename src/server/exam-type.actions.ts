'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamTypeSingle } from "@/lib/dtos/laboratory/exam/type/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchExamTypes = async (filter: FilterMeta): Promise<ExamTypeSingle[]> => {
    const session = await auth();
    const { data }: ObjectArray<ExamTypeSingle> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examTypeSearch');
    return data;
}

export const countExamTypes = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examTypePages');
    return pages;
}

/* export const retriveFullExam = async (): Promise<ExamType[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('examtypeFullDetails');
    return data;
}

export const searchExamtype = async (filter: FilterMeta): Promise<ExamTypeSingle[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examtypeSearch');
    return data;
}

export const countExamtype = async (filter: FilterMeta): Promise<ExamTypeSingle[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examtypeSearch');
    return data;
} */