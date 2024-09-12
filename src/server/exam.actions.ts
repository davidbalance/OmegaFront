'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Exam } from "@/lib/dtos/laboratory/exam/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchExam = async (subtype: number, filter: FilterMeta): Promise<Exam[]> => {
    const session = await auth();
    const { data }: ObjectArray<Exam> = await omega()
        .addParams({ subtype })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSearch');
    return data;
}

export const countExam = async (subtype: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ subtype })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examPages');
    return pages;
}

export const retriveExam = async (id: number): Promise<Exam> => {
    const session = await auth();
    const data: Exam = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('examDetail');
    return data;
}

type ExamBody = Pick<Exam, 'subtype'>;
export const updateExam = async (id: number, body: ExamBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('examUpdate');
    revalidatePath('');
}