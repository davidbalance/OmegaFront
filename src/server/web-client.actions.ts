'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaWebResource } from "@/lib/dtos/omega/web/resource/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export type WebClientLogo = { logo: number; }
export const retriveClientLogo = async (user: number): Promise<WebClientLogo> => {
    const session = await auth();
    const data: WebClientLogo = await omega()
        .addParams({ user })
        .addToken(session.access_token)
        .execute('webClientLogoDetail');
    return data;
}

export const updateClientLogo = async (user: number, body: WebClientLogo): Promise<WebClientLogo> => {
    const session = await auth();
    const data: WebClientLogo = await omega()
        .addParams({ user })
        .addBody(body)
        .addToken(session.access_token)
        .execute('webClientLogoUpdate');
    return data;
}


export const retriveClientResource = async (user: number): Promise<OmegaWebResource[]> => {
    const session = await auth();
    const { data }: ObjectArray<OmegaWebResource> = await omega()
        .addParams({ user })
        .addToken(session.access_token)
        .execute('webClientResourceDetails');
    return data;
}

type WebClientResourceBody = { resources: number[] }
export const updateClientResource = async (user: number, body: WebClientResourceBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ user })
        .addToken(session.access_token)
        .addBody(body)
        .execute('webClientResourceUpdate');

    revalidatePath(`/omega/admin/user/${user}/access`);
    revalidatePath('/omega/admin/user');
}