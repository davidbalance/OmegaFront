'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Area } from "@/lib/dtos/location/area/base.response.dto"
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchArea = async (management: number, filter: FilterMeta): Promise<Area[]> => {
    const session = await auth();
    const { data }: ObjectArray<Area> = await omega()
        .addParams({ management })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('areaSearch');
    return data;
}

export const countArea = async (management: number, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addParams({ management })
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('areaPages');
    return pages;
}

export const retriveArea = async (id: number): Promise<Area> => {
    const session = await auth();
    const data: Area = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('areaDetail');
    return data;
}

type AreaBody = Omit<Area, 'id'>;
export const createArea = async (data: AreaBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(data)
        .addToken(session.access_token)
        .execute('areaCreate');
    revalidatePath('/omega/management');
}

export const updateArea = async (id: number, data: Partial<AreaBody>): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('areaUpdate');
    revalidatePath(`/omega/area/${id}/update`);
    revalidatePath(`/omega/area/${id}/change`);
    revalidatePath('/omega/management');
}

export const deleteArea = async (id: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('areaDelete');
    revalidatePath('/omega/management');
}