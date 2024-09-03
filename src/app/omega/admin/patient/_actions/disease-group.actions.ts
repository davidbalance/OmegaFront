'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { DiseaseGroup } from "@/lib/dtos/disease/group/base.response.dto"
import { GetDiseaseGroupArrayResponseDto } from "@/lib/dtos/disease/group/response.dto";

export const retriveDiseaseGroups = async (): Promise<DiseaseGroup[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetDiseaseGroupArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('diseaseGroupDetails');
    return data;
}