'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Disease } from "@/lib/dtos/disease/base.response.dto";
import { GetDiseaseResponseDto } from "@/lib/dtos/disease/response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchDisease = async (filter: FilterMeta, group: number): Promise<Disease[]> => {
    const session = await auth();
    const { data }: ObjectArray<Disease> = await omega()
        .addQuery({ ...filter })
        .addParams({ group })
        .addToken(session.access_token)
        .execute('diseaseSearch');
    return data;
}

export const countDisease = async (filter: CountMeta, group: number): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addParams({ group })
        .addToken(session.access_token)
        .execute('diseasePages');
    return pages;
}

export const retriveDisease = async (id: number): Promise<Disease> => {
    const session = await auth();
    const data: GetDiseaseResponseDto = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseDetail');
    return data;
}

type DiseaseBody = Omit<Disease, 'id'>;
export const createDisease = async (body: DiseaseBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('diseaseCreate');
    revalidatePath('/omega/disease');
}

export const updateDisease = async (id: number, body: Partial<DiseaseBody>): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('diseaseUpdate');
    revalidatePath(`/omega/disease/${id}/update`);
    revalidatePath(`/omega/disease/${id}/change`);
    revalidatePath('/omega/disease');
}

export const deleteDisease = async (id: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseDelete');
    revalidatePath('/omega/disease');
}