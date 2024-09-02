'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { PostMedicalClientManagementRequest } from "@/lib/dtos/medical/client/management/base.request.dto";
import { MedicalClientManagement } from "@/lib/dtos/medical/client/management/base.response.dto";
import { GetMedicalClientManagementResponseDto } from "@/lib/dtos/medical/client/management/response.dto";

export const retriveClientManagement = async (dni: string): Promise<MedicalClientManagement> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: GetMedicalClientManagementResponseDto = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalClientManagementDetail');
    return data;
}

export const assingManagementIntoClient = async (dni: string, data: PostMedicalClientManagementRequest): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ dni })
        .addBody(data)
        .addToken(session.access_token)
        .execute('medicalClientManagementCreate');
}