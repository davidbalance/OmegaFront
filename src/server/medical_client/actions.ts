'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { AddAreaMedicalClientPayload, AddJobPositionMedicalClientPayload, AddManagementMedicalClientPayload, CreateClientEmailPayload, CreateMedicalClientPayload, DefaultClientEmailPayload, MedicalAreaClient, MedicalClient, MedicalClientEmail, MedicalClientQuery, MedicalJobPositionClient, MedicalManagementClient, RemoveClientEmailPayload } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidatePath, revalidateTag } from "next/cache";

export const retriveClientByDni = async (patientDni: string): Promise<MedicalClient> => {
    const session = await auth();
    const data: MedicalClient = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .execute('retriveClientByDni');
    return data;
}

export const retriveClients = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClients');
    return data;
}

export const retriveClientsCompany = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClientsCompany');
    return data;
}

export const retriveClientsEEQ = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClientsEEQ');
    return data;
}

export const retriveClientsDoctor = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClientsDoctor');
    return data;
}

export const retriveClientEmails = async (dni: string): Promise<MedicalClientEmail[]> => {
    const session = await auth();
    const data: MedicalClientEmail[] = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientEmails');
    return data;
}

export const retriveClientArea = async (dni: string): Promise<MedicalAreaClient> => {
    const session = await auth();
    const data: MedicalAreaClient = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientArea');
    return data;
}

export const retriveClientJobPosition = async (dni: string): Promise<MedicalJobPositionClient> => {
    const session = await auth();
    const data: MedicalJobPositionClient = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientJobPosition');
    return data;
}

export const retriveClientManagement = async (dni: string): Promise<MedicalManagementClient> => {
    const session = await auth();
    const data: MedicalManagementClient = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientManagement');
    return data;
}

export const retriveClientMassiveLoadTemplate = async (): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .execute('retriveClientMassiveLoadTemplate');
    return data;
}

export const createClient = async (payload: CreateMedicalClientPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createClient');

    revalidateTag('retriveClients');
    revalidateTag('retriveClientsEEQ');
    revalidateTag('retriveClientsDoctor');
}

export const massiveLoadClient = async (formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(formData)
        .execute('massiveLoadClient');

    revalidateTag('retriveClients');
    revalidateTag('retriveClientsEEQ');
    revalidateTag('retriveClientsDoctor');
}


export const addAreaClient = async (payload: AddAreaMedicalClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('addAreaClient');
}

export const addJobPositionClient = async (payload: AddJobPositionMedicalClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('addJobPositionClient');

    revalidateTag('retriveClientJobPosition');
}

export const addManagementClient = async (payload: AddManagementMedicalClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('addManagementClient');
}

export const createClientEmail = async (payload: CreateClientEmailPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createClientEmail');

    revalidatePath('retriveClientEmails');
}

export const defaultClientEmail = async (payload: DefaultClientEmailPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .addFlags(['--no-body'])
        .execute('defaultClientEmail');

    revalidatePath('retriveClientEmails');
}

export const removeClientEmail = async (payload: RemoveClientEmailPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeClientEmail');

    revalidatePath('retriveClientEmails');
}