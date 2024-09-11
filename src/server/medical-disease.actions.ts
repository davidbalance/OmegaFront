'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { MedicalResultDisease, MedicalResultDiseaseYear } from "@/lib/dtos/medical/result/disease/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveMedicalDiseases = async (result: number): Promise<MedicalResultDisease[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalResultDisease> = await omega()
        .addParams({ result })
        .addToken(session.access_token)
        .execute('medicalDiseaseDetails');
    return data;
}

type MedicalDiseaseBody = Omit<MedicalResultDisease, 'id'>;
export const createMedicalDisease = async (result: number, body: MedicalDiseaseBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ result })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalDiseaseCreate');
    revalidatePath(`/omega/medical/result/${result}/disease`);
}

export const retriveMedicalDisease = async (id: number): Promise<MedicalResultDisease[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalResultDisease> = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalDiseaseDetail');
    return data;
}

export const updateMedicalDisease = async (id: number, body: MedicalDiseaseBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalDiseaseUpdate');
    revalidatePath('');
}

export const deleteMedicalDisease = async (id: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalDiseaseDelete');
    revalidatePath('');
}

type BlobFilter = { year: number, corporativeName: string, companyRuc: string }
export const retriveMedicalDiseaseBlob = async (body: BlobFilter): Promise<Blob> => {
    const session = await auth();
    const blob: Blob = await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalDiseaseExport');
    return blob;
}

export const retriveMedicalDiseaseYear = async (): Promise<MedicalResultDiseaseYear[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalResultDiseaseYear> = await omega()
        .addToken(session.access_token)
        .execute('medicalDiseaseYear');
    return data;
}