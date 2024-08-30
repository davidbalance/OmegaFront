'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route"
import omega from "@/lib/api-client/omega-client/omega";
import { GetUserArrayResponseDto } from "@/lib/dtos/user/user/response.dto";

export const retriveUsers = async () => {
    const session = await auth();
    if (!session) throw new Error('Something went wrong');
    const { data }: GetUserArrayResponseDto = await omega().addToken(session.access_token).execute('userDetails');
    return data;
}