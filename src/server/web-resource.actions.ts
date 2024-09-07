'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaNavResource } from "@/lib/dtos/omega/nav/resource/base.response.dto";
import { OmegaWebResource } from "@/lib/dtos/omega/web/resource/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

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

export const updateWebResource = async (id: number): Promise<OmegaWebResource[]> => {
    const session = await auth();
    const { data }: ObjectArray<OmegaWebResource> = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('webResourceUpdate');
    return data;
}

export const deleteWebResource = async (id: number): Promise<OmegaWebResource[]> => {
    const session = await auth();
    const { data }: ObjectArray<OmegaWebResource> = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('webResourceUpdate');
    return data;
}