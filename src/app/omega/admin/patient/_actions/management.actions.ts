'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { GetManagementArrayResponseDto } from "@/lib/dtos/location/management/response.dto";

export const retriveManagements = async () => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetManagementArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('managementDetails');
    return data;
}