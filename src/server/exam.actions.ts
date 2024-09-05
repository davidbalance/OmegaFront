'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Exam } from "@/lib/dtos/laboratory/exam/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchExams = async (subtype: number, filter: FilterMeta): Promise<Exam[]> => {
    const session = await auth();
    const { data }: ObjectArray<Exam> = await omega()
        .addParams({ subtype })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examSearch');
    return data;
}

export const countExams = async (subtype: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ subtype })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examPages');
    return pages;
}