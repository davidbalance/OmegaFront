'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { Logger, LoggerLevel, LoggerQuery } from "./server-types";
import { PaginationResponse } from "@/lib/types/pagination.type";

export const serverActionRetriveLogger = async (query: LoggerQuery): Promise<PaginationResponse<Logger>> => {
    const session = await auth();
    const data: PaginationResponse<Logger> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveLogger');
    return data;
}

export const serverActionRetriveLoggerLevels = async (): Promise<LoggerLevel[]> => {
    const session = await auth();
    const data: LoggerLevel[] = await omega()
        .addToken(session.access_token)
        .execute('retriveLoggerLevels');
    return data;
}