'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { ApiKey, CreateApiKeyPayload } from "./server-types";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveApiKeys = async () => {
    const session = await auth();
    const data: ApiKey[] = await omega()
        .addToken(session.access_token)
        .execute('retriveApiKeys');
    return data;
};

const createApiKey = async (payload: CreateApiKeyPayload): Promise<string> => {
    const session = await auth();
    const key: string = await omega()
        .addToken(session.access_token)
        .addBody(payload)
        .execute('createApiKey');

    revalidateTag('retriveApiKeys');
    return key;
}

export const serverActionCreateApiKey = withResult(createApiKey);