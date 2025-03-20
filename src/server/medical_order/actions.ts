'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { CreateMedicalOrderPayload, MedicalChecklist, MedicalCloudFile, MedicalOrder, MedicalOrderDoctor, MedicalOrderPatient, MedicalOrderPatientQuery, MedicalOrderQuery, Process, SendMedicalOrderPayload, Year } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const retriveProcesses = async (): Promise<Process[]> => {
    const session = await auth();
    const data: Process[] = await omega()
        .addToken(session.access_token)
        .execute('retriveProcesses');
    return data;
}

export const retriveYears = async (): Promise<Year[]> => {
    const session = await auth();
    const data: Year[] = await omega()
        .addToken(session.access_token)
        .execute('retriveYears');
    return data;
}

export const retriveMedicalOrders = async (payload: MedicalOrderQuery): Promise<PaginationResponse<MedicalOrder>> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<MedicalOrder> = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveMedicalOrders');
    return data;
}

export const retriveMedicalOrder = async (orderId: string): Promise<MedicalOrder> => {
    const session = await auth();
    const data: MedicalOrder = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('retriveMedicalOrder');
    return data;
}

export const retriveMedicalOrdersPatient = async (query: MedicalOrderPatientQuery): Promise<PaginationResponse<MedicalOrderPatient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalOrderPatient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveMedicalOrdersPatient');
    return data;
}

export const retriveMedicalCloud = async (orderId: string): Promise<MedicalCloudFile[]> => {
    const session = await auth();
    const data: MedicalCloudFile[] = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('retriveMedicalCloud');
    return data;
}

export const retriveMedicalChecklist = async (orderId: string): Promise<MedicalChecklist[]> => {
    const session = await auth();
    const data: MedicalChecklist[] = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('retriveMedicalChecklist');
    return data;
}

export const retriveMedicalChecklistFile = async (orderId: string): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('retriveMedicalChecklistFile');
    return data;
}

export const retriveMedicalOrdersDoctor = async (payload: MedicalOrderQuery): Promise<PaginationResponse<MedicalOrderDoctor>> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<MedicalOrderDoctor> = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveMedicalOrdersDoctor');
    return data;
}

export const retriveMedicalOrderMassiveLoadTemplate = async (): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .execute('retriveMedicalOrderMassiveLoadTemplate');
    return data;
}

export const createMedicalOrder = async (payload: CreateMedicalOrderPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const removeMedicalOrder = async (orderId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('removeMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const sendMedicalOrder = async (payload: SendMedicalOrderPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('sendMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
    revalidateTag('retriveMedicalOrdersDoctor');
}

export const validatedStatusMedicalOrder = async (orderId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ orderId, status: 'status-validated' })
        .addFlags(['--no-body'])
        .execute('changeStatusMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const createdStatusMedicalOrder = async (orderId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ orderId, status: 'status-created' })
        .addFlags(['--no-body'])
        .execute('changeStatusMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const massiveLoadOrder = async (formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(formData)
        .execute('massiveLoadOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}
