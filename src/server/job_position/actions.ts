'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { JobPosition, JobPositionOption, JobPositionQuery } from "./server_types";
import { PaginationResponse } from "@/lib/types/pagination.type";

export const retriveJobPositions = async (query: JobPositionQuery): Promise<PaginationResponse<JobPosition>> => {
    const session = await auth();
    const data: PaginationResponse<JobPosition> = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveJobPositions');
    return data;
}

export const retriveJobPosition = async (): Promise<JobPosition> => {
    const session = await auth();
    const data: JobPosition = await omega()
        .addToken(session.access_token)
        .execute('retriveJobPosition');
    return data;
}

export const retriveJobPositionsOptions = async (): Promise<JobPositionOption[]> => {
    const session = await auth();
    const data: JobPositionOption[] = await omega()
        .addToken(session.access_token)
        .execute('retriveJobPositionsOptions');
    return data;
}
