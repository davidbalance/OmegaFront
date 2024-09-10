'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaNavResource } from "@/lib/dtos/omega/nav/resource/base.response.dto";
import { OmegaWebResource } from "@/lib/dtos/omega/web/resource/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveNavResources = async (): Promise<OmegaNavResource[]> => {
    const session = await auth();
    const { data }: ObjectArray<OmegaNavResource> = await omega()
        .addToken(session.access_token)
        .execute('navResourceDetails');
    return data;
}

export const retriveWebResources = async (): Promise<OmegaWebResource[]> => {
    const session = await auth();
    const { data }: ObjectArray<OmegaWebResource> = await omega()
        .addToken(session.access_token)
        .execute('webResourceDetails');
    return data;
}

export const retriveWebResource = async (id: number): Promise<OmegaWebResource> => {
    const session = await auth();
    const data: OmegaWebResource = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('webResourceDetail');
    return data;
}

type OmegaWebResourceBody = Pick<OmegaWebResource, 'icon' | 'address' | 'label' | 'name'>;
export const createWebResource = async (body: OmegaWebResourceBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('webResourceCreate');
    revalidatePath('/omega/developer/navigation');
}

export const updateWebResource = async (id: number, body: OmegaWebResourceBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('webResourceUpdate');
    revalidatePath(`/omega/developer/navigation/${id}/update`);
    revalidatePath('/omega/developer/navigation');
}

export const deleteWebResource = async (id: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('webResourceDelete');
    revalidatePath('/omega/developer/navigation');
}