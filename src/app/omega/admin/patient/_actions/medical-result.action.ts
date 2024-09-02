'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { GetMedicalResultArrayResponseDto } from "@/lib/dtos/medical/result/response.dto";

export const retriveMedicalResultsByOrder = async (id: number): Promise<MedicalResult[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetMedicalResultArrayResponseDto = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalResultDetailsByOrder');

    return data;
}