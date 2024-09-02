'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchMedicalClientJobPositionRequestDto } from "@/lib/dtos/medical/client/job/position/request.dto";
import { GetMedicalClientJobPositionResponseDto } from "@/lib/dtos/medical/client/job/position/response.dto";

export const retriveClientJobPosition = async (dni: string): Promise<string | undefined> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { jobPositionName }: GetMedicalClientJobPositionResponseDto = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalClientJobPositionDetail');
    return jobPositionName;
}

export const addJobPositionToClient = async (dni: string, data: PatchMedicalClientJobPositionRequestDto): Promise<string | undefined> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { jobPositionName }: GetMedicalClientJobPositionResponseDto = await omega()
        .addParams({ dni })
        .addBody(data)
        .addToken(session.access_token)
        .execute('medicalClientJobPositionUpdate');
    return jobPositionName;
}