'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaNavResource } from "@/lib/dtos/omega/nav/resource/base.response.dto";
import { GetOmegaNavResourceArrayResponseDto } from "@/lib/dtos/omega/nav/resource/response.dto";
import { revalidatePath } from "next/cache";

export const retriveClientResources = async (id: number): Promise<OmegaNavResource[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetOmegaNavResourceArrayResponseDto = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('webClientResourceDetails');
    return data;
}

export const updateClientResources = async (id: number, resources: number[]): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id: id })
        .addToken(session.access_token)
        .addBody({ resources })
        .execute('webClientResourceUpdate');
    revalidatePath('');
}