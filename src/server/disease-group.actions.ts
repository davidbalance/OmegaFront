'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { DiseaseGroup, DiseaseGroupSingle } from "@/lib/dtos/disease/group/base.response.dto"
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveFullDiseaseGroups = async (): Promise<DiseaseGroup[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<DiseaseGroup> = await omega()
        .addToken(session.access_token)
        .execute('diseaseGroupFullDetails');
    return data;
}

export const searchDiseaseGroup = async (filter: FilterMeta): Promise<DiseaseGroupSingle[]> => {
    const session = await auth();
    const { data }: ObjectArray<DiseaseGroupSingle> = await omega()
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

export const retriveDiseaseGroup = async (id: number): Promise<DiseaseGroupSingle> => {
    const session = await auth();
    const data: DiseaseGroupSingle = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseGroupDetail');
    return data;
}

type DiseaseGroupBody = Omit<DiseaseGroupSingle, 'id'>
export const createDiseaseGroup = async (body: DiseaseGroupBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(body)
        .execute('diseaseGroupCreate');
}

export const updateDiseaseGroup = async (id: number, body: DiseaseGroupBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .addBody(body)
        .execute('diseaseGroupUpdate');
}

export const deleteDiseaseGroup = async (id: number): Promise<void> => {
    const session = await auth();

    const { hasDiseases }: { hasDiseases: boolean } = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('diseaseGroupHasDiseases');

    if (hasDiseases) {
        throw new Error('El grupo tiene asignadas morbilidades');
    }

    console.log(1)
    await omega()
    .addParams({ id })
    .addToken(session.access_token)
    .execute('diseaseGroupDelete');
    console.log(2)
    revalidatePath('');
    console.log(3)
}