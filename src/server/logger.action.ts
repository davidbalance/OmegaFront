'use server'

import omega from "@/lib/api-client/omega-client/omega";
import { ServerLog, ServerLogLevel } from "@/lib/dtos/logs/log.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

type LogFilter = { level?: string, toDate?: number, fromDate?: number }
export const searchLog = async (filter: FilterMeta & LogFilter): Promise<ServerLog[]> => {
    console.log(filter);
    const { data }: ObjectArray<ServerLog> = await omega()
        .addQuery({ ...filter })
        .execute('logSearch');
    return data;
}

export const countLog = async (filter: CountMeta & LogFilter): Promise<number> => {
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .execute('logPages');
    return pages;
}

export const retriveLogLevels = async (): Promise<ServerLogLevel[]> => {
    const { data }: ObjectArray<ServerLogLevel> = await omega()
        .execute('logLevel');
    console.log(data);
    return data;
}