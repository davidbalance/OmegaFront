'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { ApiKey } from "@/lib/dtos/auth/api/key/base.response.dto"
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveApikeys = async (): Promise<ApiKey[]> => {
    const session = await auth();
    const { data }: ObjectArray<ApiKey> = await omega()
        .addToken(session.access_token)
        .execute('apikeyDetails');
    return data;
}

type ApikeyBody = { name: string; }
export const createApikey = async (body: ApikeyBody): Promise<string> => {
    const session = await auth();
    const { apikey }: { apikey: string } = await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('apikeyCreate');
    revalidatePath('/omega/api-key');
    return apikey;
}