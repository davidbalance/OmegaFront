'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route"
import omega from "@/lib/api-client/omega-client/omega";
import { ServerLog, ServerLogLevel } from "@/lib/dtos/logs/log.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveLogs = async (): Promise<ServerLog[]> => {
    const session = await auth();
    const { data }: ObjectArray<ServerLog> = await omega()
        .addToken(session.access_token)
        .execute('logDetails');
    return data;
}

export const retriveLogLevels = async (): Promise<ServerLogLevel[]> => {
    const session = await auth();
    const { data }: ObjectArray<ServerLogLevel> = await omega()
        .addToken(session.access_token)
        .execute('logLevel');
    return data;
}