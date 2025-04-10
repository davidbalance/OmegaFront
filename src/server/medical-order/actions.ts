'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { CreateMedicalOrderPayload, MedicalChecklist, MedicalCloudFile, MedicalOrder, MedicalOrderDoctor, MedicalOrderPatient, MedicalOrderPatientQuery, MedicalOrderQuery, Process, SendMedicalOrderPayload, Year } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidateTag } from "next/cache";

export const serverActionRetriveProcesses = async (): Promise<Process[]> => {
    const session = await auth();
    const data: Process[] = await omega()
        .addToken(session.access_token)
        .execute('retriveProcesses');
    return data;
}

export const serverActionRetriveYears = async (): Promise<Year[]> => {
    const session = await auth();
    const data: Year[] = await omega()
        .addToken(session.access_token)
        .execute('retriveYears');
    return data;
}

export const serverActionRetriveMedicalOrders = async (payload: MedicalOrderQuery): Promise<PaginationResponse<MedicalOrder>> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<MedicalOrder> = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveMedicalOrders');
    return data;
}

export const serverActionRetriveMedicalOrdersEEQ = async (payload: MedicalOrderQuery): Promise<PaginationResponse<MedicalOrder>> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<MedicalOrder> = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveMedicalOrdersEEQ');
    return data;
}

export const serverActionRetriveMedicalOrdersCompany = async (payload: MedicalOrderQuery): Promise<PaginationResponse<MedicalOrder>> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<MedicalOrder> = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveMedicalOrdersCompany');
    return data;
}

export const serverActionRetriveMedicalOrder = async (orderId: string): Promise<MedicalOrder> => {
    const session = await auth();
    const data: MedicalOrder = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('retriveMedicalOrder');
    return data;
}

export const serverActionRetriveMedicalOrdersPatient = async (query: MedicalOrderPatientQuery): Promise<PaginationResponse<MedicalOrderPatient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalOrderPatient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveMedicalOrdersPatient');
    return data;
}

export const serverActionRetriveMedicalCloud = async (orderId: string): Promise<MedicalCloudFile[]> => {
    const data: MedicalCloudFile[] = await omega()
        .addParams({ orderId })
        .execute('retriveMedicalCloud');
    return data;
}

export const serverActionRetriveMedicalChecklist = async (orderId: string): Promise<MedicalChecklist[]> => {
    const session = await auth();
    const data: MedicalChecklist[] = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('retriveMedicalChecklist');
    return data;
}

export const serverActionRetriveMedicalChecklistFile = async (orderId: string): Promise<Blob> => {
    const timestamp = Date.now();
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveMedicalChecklistFile');
    return data;
}

export const serverActionRetriveMedicalOrdersDoctor = async (payload: MedicalOrderQuery): Promise<PaginationResponse<MedicalOrderDoctor>> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: PaginationResponse<MedicalOrderDoctor> = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveMedicalOrdersDoctor');
    return data;
}

export const serverActionRetriveMedicalOrderMassiveLoadTemplate = async (): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .execute('retriveMedicalOrderMassiveLoadTemplate');
    return data;
}

export const serverActionCreateMedicalOrder = async (payload: CreateMedicalOrderPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const serverActionRemoveMedicalOrder = async (orderId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .execute('removeMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const serverActionSendMedicalOrder = async (payload: SendMedicalOrderPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('sendMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
    revalidateTag('retriveMedicalOrdersDoctor');
}

export const serverActionValidatedStatusMedicalOrder = async (orderId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ orderId, status: 'status-validated' })
        .addFlags(['--no-body'])
        .execute('changeStatusMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const serverActionCreatedStatusMedicalOrder = async (orderId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ orderId, status: 'status-created' })
        .addFlags(['--no-body'])
        .execute('changeStatusMedicalOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}

export const serverActionMassiveLoadOrder = async (formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(formData)
        .execute('massiveLoadOrder');

    revalidateTag('retriveMedicalOrders');
    revalidateTag('retriveMedicalOrdersPatient');
}
