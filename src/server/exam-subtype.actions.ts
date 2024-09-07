'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamSingleSubtype } from "@/lib/dtos/laboratory/exam/subtype/base.response.dto";
import { PostExamSubtypeRequestDto } from "@/lib/dtos/laboratory/exam/subtype/request.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchExamSubtypes = async (type: number, filter: FilterMeta): Promise<ExamSingleSubtype[]> => {
    const session = await auth();
    const { data }: ObjectArray<ExamSingleSubtype> = await omega()
        .addParams({ type })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSubtypeSearch');
    return data;
}

export const countExamSubtypes = async (type: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ type })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSubtypePages');
    return pages;
}

export const retriveExamSubtype = async (id: number): Promise<ExamSingleSubtype> => {
    const session = await auth();
    const data: ExamSingleSubtype = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examsubtypeDetail');
    console.log(data);
    return data;
}

type ExamSubtypeBody = Omit<ExamSingleSubtype, 'id'>
export const createExamSubtype = async (body: ExamSubtypeBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('examsubtypeCreate');
}

export const updateExamSubtype = async (id: number, body: Partial<ExamSubtypeBody>): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('examsubtypeUpdate');
}

export const deleteExamSubtype = async (id: number): Promise<void> => {
    const session = await auth();

    const { hasExams }: { hasExams: boolean } = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examsubtypeHasExams');

    if (hasExams) {
        throw new Error('Tiene examenes asignados');
    }

    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examsubtypeDelete');
    revalidatePath('');
}