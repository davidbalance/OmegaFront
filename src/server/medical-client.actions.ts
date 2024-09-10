'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { Patient } from "@/lib/dtos/user/patient/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchMedicalClientByDoctor = async (filter: FilterMeta): Promise<Patient[]> => {
    const session = await auth();
    const { data }: ObjectArray<Patient> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalClientByDoctorSearch');

    return data;
}

export const countMedicalClientByDoctor = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalClientByDoctorPages');

    return pages;
}

export type MedicalClientJobPosition = { jobPositionName: string }
export const retriveMedicalClientJobPosition = async (dni: string): Promise<MedicalClientJobPosition> => {
    const session = await auth();
    const data: MedicalClientJobPosition = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalClientJobPositionDetail');
    return data;
}

type MedicalClientJobPositionBody = MedicalClientJobPosition;
export const updateMedicalClientJobPosition = async (dni: string, body: MedicalClientJobPositionBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ dni })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalClientJobPositionUpdate');
    revalidatePath(`/omega/admin/patient/${dni}/job/position`);
}

export const retriveMedicalClientManagement = async (dni: string): Promise<MedicalClientManagementArea> => {
    const session = await auth();
    const data: MedicalClientManagementArea = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalClientManagementDetail');
    return data;
}

type MedicalClientManagementArea = { managementId?: number; managementName?: string; areaId?: number; areaName?: string; }
type MedicalClientManagementAreaBody = MedicalClientManagementArea;
export const updateMedicalClientManagement = async (dni: string, body: MedicalClientManagementAreaBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ dni })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalClientManagementCreate');
    revalidatePath(`/omega/admin/patient/${dni}/area`);
}


