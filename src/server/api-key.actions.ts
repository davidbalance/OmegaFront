'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ApiKey } from "@/lib/dtos/auth/api/key/base.response.dto"
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveApikeys = async (): Promise<ApiKey[]> => {
    const session = await auth();
    const { data }: ObjectArray<ApiKey> = await omega()
        .addToken(session.access_token)
        .execute('apikeyDetails');
    return data;
}

type ApikeyBody = { name: string; }
export const createApikey = async (body: ApikeyBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody(body)
        .addToken(session.access_token)
        .execute('apikeyDetails');
}