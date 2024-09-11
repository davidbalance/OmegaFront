'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchMedicalResultByDoctor = async (order: number, filter: FilterMeta): Promise<MedicalResult[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalResult> = await omega()
        .addQuery({ ...filter })
        .addParams({ order })
        .addToken(session.access_token)
        .execute('medicalResultByDoctorSearch');

    return data;
}

export const countMedicalResultByDoctor = async (order: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addParams({ order })
        .addToken(session.access_token)
        .execute('medicalResultByDoctorPages');

    return pages;
}

export const searchMedicalResult = async (order: number, filter: FilterMeta): Promise<MedicalResult[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalResult> = await omega()
        .addParams({ order })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalResultSearch');
    return data;
}

export const countMedicalResult = async (order: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ order })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalResultPages');
    return pages;
}

export const retriveMedicalResult = async (id: number): Promise<MedicalResult> => {
    const session = await auth();
    const data: MedicalResult = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalResultDetail');
    return data;
}

type MedicalResultUpdateBody = { examType: string, examSubtype: string, examName: string }
export const updateMedicalResult = async (id: number, body: MedicalResultUpdateBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalResultUpdate');
}

export const uploadMedicalResult = async (id: number, body: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalResultUpload');
    revalidatePath('/omega/admin/order');
}


export const retriveMedicalResultReport = async (id: number): Promise<{ content: string } | undefined> => {
    const session = await auth();
    try {
        const data: { content: string } = await omega()
            .addParams({ id })
            .addToken(session.access_token)
            .execute('medicalResultReportDetail');
        return data;
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            if (error.status === 404) {
                return undefined;
            }
        }
        throw error;
    }
}