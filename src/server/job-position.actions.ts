'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { JobPosition } from "@/lib/dtos/location/job/position/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchJobPosition = async (filter: FilterMeta): Promise<JobPosition[]> => {
    const session = await auth();
    const { data }: ObjectArray<JobPosition> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('jobpositionSearch');
    return data;
}

export const countJobPosition = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('jobpositionPages');
    return pages;
}

/* export const retriveJobPositions = async (): Promise<JobPosition[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<JobPosition> = await omega()
        .addToken(session.access_token)
        .execute('jobpositionDetails');
    return data;
}

export const retriveJobPosition = async (id: number): Promise<JobPosition> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: JobPosition = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('jobpositionDetails');
    return data;
}

type JobPositionBody = Omit<JobPosition, 'id'>;
export const createJobPosition = async (data: JobPositionBody): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addBody(data)
        .addToken(session.access_token)
        .execute('jobpositionCreate');
}

export const updateJobPosition = async (id: number, data: JobPositionBody): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('jobpositionUpdate');
}

export const deleteJobPosition = async (id: number): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('jobpositionDelete');
} */