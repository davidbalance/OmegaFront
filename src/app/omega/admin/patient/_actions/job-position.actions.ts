'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { JobPosition } from "@/lib/dtos/location/job/position/base.response.dto";
import { GetJobPositionArrayResponseDto } from "@/lib/dtos/location/job/position/response.dto";

export const retriveJobPositions = async (): Promise<JobPosition[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetJobPositionArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('jobpositionDetails');
    return data;
}