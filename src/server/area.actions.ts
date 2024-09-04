'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Area } from "@/lib/dtos/location/area/base.response.dto"
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveAreas = async (): Promise<Area[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<Area> = await omega()
        .addToken(session.access_token)
        .execute('areaDetails');
    return data;
}

export const retriveArea = async (id: number): Promise<Area> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: Area = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('areaDetail');
    return data;
}

type AreaBody = Omit<Area, 'id'> & { management: number };
export const createArea = async (data: AreaBody): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addBody(data)
        .addToken(session.access_token)
        .execute('areaDetail');
}

export const updateArea = async (id: number, data: Partial<AreaBody>): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('areaUpdate');
}

export const deleteArea = async (id: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('areaDelete');
}