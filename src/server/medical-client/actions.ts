'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { AddAreaMedicalClientPayload, AddJobPositionMedicalClientPayload, AddManagementMedicalClientPayload, ChangeRoleClientPayload, CreateClientEmailPayload, CreateMedicalClientPayload, DefaultClientEmailPayload, MedicalAreaClient, MedicalClient, MedicalClientEmail, MedicalClientQuery, MedicalJobPositionClient, MedicalManagementClient, RemoveClientEmailPayload } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { revalidatePath, revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveClientByDni = async (patientDni: string): Promise<MedicalClient> => {
    const session = await auth();
    const data: MedicalClient = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .execute('retriveClientByDni');
    return data;
}

export const serverActionRetriveClients = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClients');
    return data;
}

export const serverActionRetriveClientsCompany = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClientsCompany');
    return data;
}

export const serverActionRetriveClientsEEQ = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClientsEEQ');
    return data;
}

export const serverActionRetriveClientsDoctor = async (query: MedicalClientQuery): Promise<PaginationResponse<MedicalClient>> => {
    const session = await auth();
    const data: PaginationResponse<MedicalClient> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveClientsDoctor');
    return data;
}

export const serverActionRetriveClientEmails = async (dni: string): Promise<MedicalClientEmail[]> => {
    const session = await auth();
    const data: MedicalClientEmail[] = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientEmails');
    return data;
}

export const serverActionRetriveClientArea = async (dni: string): Promise<MedicalAreaClient> => {
    const session = await auth();
    const data: MedicalAreaClient = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientArea');
    return data;
}

export const serverActionRetriveClientJobPosition = async (dni: string): Promise<MedicalJobPositionClient> => {
    const session = await auth();
    const data: MedicalJobPositionClient = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientJobPosition');
    return data;
}

export const serverActionRetriveClientManagement = async (dni: string): Promise<MedicalManagementClient> => {
    const session = await auth();
    const data: MedicalManagementClient = await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .execute('retriveClientManagement');
    return data;
}

export const serverActionRetriveClientMassiveLoadTemplate = async (): Promise<Blob> => {
    const timestamp = Date.now();
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveClientMassiveLoadTemplate');
    return data;
}

const createClient = async (payload: CreateMedicalClientPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createClient');

    revalidateTag('retriveClients');
    revalidateTag('retriveClientsEEQ');
    revalidateTag('retriveClientsDoctor');
}

const massiveLoadClient = async (formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody(formData)
        .execute('massiveLoadClient');

    revalidateTag('retriveClients');
    revalidateTag('retriveClientsEEQ');
    revalidateTag('retriveClientsDoctor');
}


const addAreaClient = async (payload: AddAreaMedicalClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('addAreaClient');
}

const addJobPositionClient = async (payload: AddJobPositionMedicalClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('addJobPositionClient');

    revalidateTag('retriveClientJobPosition');
}

const addManagementClient = async (payload: AddManagementMedicalClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('addManagementClient');
}

const changeRoleClient = async (payload: ChangeRoleClientPayload): Promise<void> => {
    const { dni, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ dni })
        .addBody({ ...body })
        .execute('changeRoleClient');

    revalidateTag('retriveClientByDni');
    revalidateTag('retriveClientsEEQ');
}

const createClientEmail = async (payload: CreateClientEmailPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createClientEmail');

    revalidatePath('retriveClientEmails');
}

const defaultClientEmail = async (payload: DefaultClientEmailPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .addFlags(['--no-body'])
        .execute('defaultClientEmail');

    revalidatePath('retriveClientEmails');
}

const removeClientEmail = async (payload: RemoveClientEmailPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeClientEmail');

    revalidatePath('retriveClientEmails');
}

export const serverActionCreateClient = withResult(createClient);
export const serverActionMassiveLoadClient = withResult(massiveLoadClient);
export const serverActionAddAreaClient = withResult(addAreaClient);
export const serverActionAddJobPositionClient = withResult(addJobPositionClient);
export const serverActionAddManagementClient = withResult(addManagementClient);
export const serverActionChangeRoleClient = withResult(changeRoleClient);
export const serverActionCreateClientEmail = withResult(createClientEmail);
export const serverActionDefaultClientEmail = withResult(defaultClientEmail);
export const serverActionRemoveClientEmail = withResult(removeClientEmail);