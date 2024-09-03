'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalResultDisease } from "@/lib/dtos/medical/result/disease/base.response.dto"
import { PatchMedicalResultDiseaseRequestDto, PostMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import { GetMedicalResultResponseDto } from "@/lib/dtos/medical/result/response.dto";
import { revalidatePath } from "next/cache";

export const retriveMedicalDisease = async (id: number): Promise<MedicalResultDisease[] | undefined> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: GetMedicalResultResponseDto = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalResultDetail');
    return data.diseases;
}

export const createdMedicalDisease = async (data: PostMedicalResultDiseaseRequestDto): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addBody(data)
        .addToken(session.access_token)
        .execute('medicalResultDiseaseCreate');
    revalidatePath('');
}

export const updateMedicalDisease = async (id: number, data: PatchMedicalResultDiseaseRequestDto): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('medicalResultDiseaseUpdate');
    revalidatePath('');
}

export const deleteMedicalDisease = async (id: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalResultDiseaseDelete');
    revalidatePath('');
}