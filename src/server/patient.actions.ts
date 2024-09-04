'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Patient } from "@/lib/dtos/user/patient/base.response.dto";
import { PostPatientPaginationRequestDto } from "@/lib/dtos/user/patient/request.dto";
import { GetPatientArrayResponseDto, PostPatientPagesnResponseDto } from "@/lib/dtos/user/patient/response.dto";

export const retrivePatients = async (data: PostPatientPaginationRequestDto): Promise<Patient[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data: patients }: GetPatientArrayResponseDto = await omega()
        .addToken(session.access_token)
        .addBody(data)
        .execute('patientDetailsPagination');

    return patients;
}

export const patientPages = async (data: PostPatientPaginationRequestDto): Promise<number> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { pages }: PostPatientPagesnResponseDto = await omega()
        .addToken(session.access_token)
        .addBody(data)
        .execute('patientPageCount');

    return pages;
}