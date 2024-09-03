'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchMedicalResultExamRequest } from "@/lib/dtos/medical/result/exam/request.dto";
import { GetMedicalResultResponseDto } from "@/lib/dtos/medical/result/response.dto";
import { revalidatePath } from "next/cache";

export const retriveMedicalResultExam = async (id: number): Promise<{ examName: string, examSubtype: string, examType: string } | undefined> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: GetMedicalResultResponseDto = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalResultDetail');
    return data;
}

export const updateMedicalResultExam = async (id: number, data: PatchMedicalResultExamRequest): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('medicalResultUpdateDisease');
    revalidatePath('');
}