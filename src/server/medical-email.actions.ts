'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalClientEmail } from "@/lib/dtos/medical/client/email/base.response.dto";
import { GetMedicalClientEmailArrayResponseDto } from "@/lib/dtos/medical/client/email/response.dto";
import { revalidatePath } from "next/cache";

export const retriveEmail = async (dni: string): Promise<MedicalClientEmail[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetMedicalClientEmailArrayResponseDto = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalClientEmailDetails');
    return data;
}

export const createEmail = async (dni: string, email: string): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ email })
        .execute('medicalClientEmailCreate');
    revalidatePath('');
}

export const deleteEmail = async (id: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .execute('medicalClientEmailDelete');
    revalidatePath('');
}

export const setEmailAsDefault = async (id: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .addFlag("--no-body")
        .execute('medicalClientEmailUpdate');
    revalidatePath('');
}

export const sendEmail = async (order: number, mail: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addBody({ order, mail })
        .execute('medicalOrderMail');
    revalidatePath('');
}