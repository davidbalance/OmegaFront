'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { DiseaseGroup, DiseaseGroupOption } from "@/lib/dtos/disease/group/base.response.dto"
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { HasValue } from "@/lib/interfaces/has-value.interface";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveDiseaseOptions = async (): Promise<DiseaseGroupOption[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<DiseaseGroupOption> = await omega()
        .addToken(session.access_token)
        .execute('diseaseGroupOptions');
    return data;
}

export const searchDiseaseGroup = async (filter: FilterMeta): Promise<DiseaseGroup[]> => {
    const session = await auth();
    const { data }: ObjectArray<DiseaseGroup> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('diseaseGroupSearch');
    return data;
}

export const countDiseaseGroup = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('diseaseGroupPages');
    return pages;
}

export const retriveDiseaseGroup = async (id: number): Promise<DiseaseGroup> => {
    const session = await auth();
    const data: DiseaseGroup = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseGroupDetail');
    return data;
}

type DiseaseGroupBody = Omit<DiseaseGroup, 'id'>
export const createDiseaseGroup = async (body: DiseaseGroupBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(body)
        .execute('diseaseGroupCreate');
    revalidatePath('/omega/disease');
}

export const updateDiseaseGroup = async (id: number, body: Partial<DiseaseGroupBody>): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .addBody(body)
        .execute('diseaseGroupUpdate');
    revalidatePath(`/omega/disease/group/${id}/update`);
    revalidatePath('/omega/disease');
}

export const deleteDiseaseGroup = async (id: number): Promise<void> => {
    const session = await auth();

    const { hasValue }: HasValue = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseGroupHasDiseases');

    if (hasValue) {
        throw new Error('El grupo tiene asignadas morbilidades');
    }

    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseGroupDelete');
    revalidatePath('/omega/disease');
}