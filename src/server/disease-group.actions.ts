'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { DiseaseGroupSingle } from "@/lib/dtos/disease/group/base.response.dto"
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

/* export const retriveFullDiseaseGroups = async (): Promise<DiseaseGroup[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<DiseaseGroup> = await omega()
        .addToken(session.access_token)
        .execute('diseaseGroupFullDetails');
    return data;
} */

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