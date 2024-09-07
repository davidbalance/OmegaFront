'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalClientEmail } from "@/lib/dtos/medical/client/email/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveMedicalClientEmail = async (dni: string): Promise<MedicalClientEmail[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalClientEmail> = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalClientEmailDetails');

    return data;
}

type MedicalEmailBody = { email: string };
export const createMedicalClientEmail = async (dni: string, body: MedicalEmailBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ dni })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalClientEmailCreate');
}

export const defaultMedicalClientEmail = async (id: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalClientEmailUpdate');
}

export const deleteMedicalClientEmail = async (id: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalClientEmailDelete');
}