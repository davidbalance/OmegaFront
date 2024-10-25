'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { Management, ManagementOption } from "@/lib/dtos/location/management/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { HasValue } from "@/lib/interfaces/has-value.interface";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveManagementOptions = async (): Promise<ManagementOption[]> => {
    const session = await auth();
    const { data }: ObjectArray<ManagementOption> = await omega()
        .addToken(session.access_token)
        .execute('managementOptions');
    return data;
}

export const searchManagement = async (filter: FilterMeta): Promise<Management[]> => {
    const session = await auth();
    const { data }: ObjectArray<Management> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('managementSearch');
    return data;
}

export const countManagement = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('managementPages');
    return pages;
}

export const retriveManagement = async (id: number): Promise<Management> => {
    const session = await auth();
    const data: Management = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('managementDetail');
    return data;
}

type ManagementBody = Omit<Management, 'id'>;
export const createManagement = async (data: ManagementBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(data)
        .addToken(session.access_token)
        .execute('managementCreate');
    revalidatePath('/omega/management');
}

export const updateManagement = async (id: number, data: ManagementBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('managementUpdate');
    revalidatePath(`/omega/management/${id}`);
    revalidatePath('/omega/management');
}

export const deleteManagement = async (id: number): Promise<void> => {
    const session = await auth();

    const { hasValue }: HasValue = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('managementHasAreas');

    if (hasValue) {
        throw new Error('La generecia tiene areas asignadas');
    }

    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('managementDelete');
    revalidatePath('/omega/management');
}