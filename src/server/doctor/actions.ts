'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Doctor, DoctorOption, DoctorQuery } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";


export const retriveDoctors = async (query: DoctorQuery): Promise<PaginationResponse<Doctor>> => {
    const session = await auth();
    const data: PaginationResponse<Doctor> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveDoctors');
    return data;
}

export const retriveDoctor = async (userDni: string): Promise<Doctor> => {
    const session = await auth();
    const data: Doctor = await omega()
        .addToken(session.access_token)
        .addParams({ userDni })
        .execute('retriveDoctor');
    return data;
}

export const retriveDoctorsOptions = async (): Promise<DoctorOption[]> => {
    const session = await auth();
    const data: DoctorOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveDoctorsOptions');
    return data;
}

export const retriveDoctorFile = async (userId: string): Promise<Blob> => {
    const timestamp = Date.now();
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveDoctorFile');
    return data;
}

export const uploadDoctorSignature = async (userId: string, formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ userId })
        .addBody(formData)
        .execute('uploadDoctorSignature');

    revalidateTag('retriveDoctorsOptions');
}