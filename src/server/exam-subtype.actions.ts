'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamSubtype } from "@/lib/dtos/laboratory/exam/subtype/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { HasValue } from "@/lib/interfaces/has-value.interface";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchExamSubtype = async (type: number, filter: FilterMeta): Promise<ExamSubtype[]> => {
    const session = await auth();
    const { data }: ObjectArray<ExamSubtype> = await omega()
        .addParams({ type })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSubtypeSearch');
    return data;
}

export const countExamSubtype = async (type: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ type })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSubtypePages');
    return pages;
}

export const retriveExamSubtype = async (id: number): Promise<ExamSubtype> => {
    const session = await auth();
    const data: ExamSubtype = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examSubtypeDetail');
    console.log(data);
    return data;
}

type ExamSubtypeBody = Omit<ExamSubtype, 'id'>
export const createExamSubtype = async (body: ExamSubtypeBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('examSubtypeCreate');
    revalidatePath('/omega/laboratory');
}

export const updateExamSubtype = async (id: number, body: Partial<ExamSubtypeBody>): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('examSubtypeUpdate');
    revalidatePath(`/omega/laboratory/subtype/${id}/update`);
    revalidatePath(`/omega/laboratory/subtype/${id}/change`);
    revalidatePath('/omega/laboratory');

}

export const deleteExamSubtype = async (id: number): Promise<void> => {
    const session = await auth();

    const { hasValue }: HasValue = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examSubtypeHasExams');

    if (hasValue) {
        throw new Error('Tiene examenes asignados');
    }

    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examSubtypeDelete');
    revalidatePath('/omega/laboratory');
}