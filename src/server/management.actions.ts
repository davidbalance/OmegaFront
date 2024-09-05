'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Management } from "@/lib/dtos/location/management/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchManagement = async (filter: FilterMeta): Promise<Management[]> => {
    const session = await auth();
    const { data }: ObjectArray<Management> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('managementDetails');
    return data;
}

export const countManagement = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('managementDetails');
    return pages;
}

/* export const retriveManagements = async (): Promise<Management[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<Management> = await omega()
        .addToken(session.access_token)
        .execute('managementDetails');
    return data;
}

export const retriveManagement = async (id: number): Promise<Management> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: Management = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('managementDetail');
    return data;
}

type ManagementBody = Omit<Management, 'id'>;
export const createManagement = async (data: ManagementBody): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addBody(data)
        .addToken(session.access_token)
        .execute('managementCreate');
}

export const updateManagement = async (id: number, data: ManagementBody): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('managementUpdate');
}

export const deleteManagement = async (id: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('managementUpdate');
} */