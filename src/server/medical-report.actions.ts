'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { revalidatePath } from "next/cache";

type MedicalResultUpdateBody = { content: string, medicalResult: number; }
export const createMedicalReport = async (body: MedicalResultUpdateBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalReportCreate');
    revalidatePath(`/omega/medical/result/${body.medicalResult}/report`);
    revalidatePath('/omega/medical/report');
}

export const uploadMedicalReport = async (id: number, body: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalReportUpload');
    revalidatePath('/omega/medical/report');
}