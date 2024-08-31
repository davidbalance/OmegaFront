'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route"
import omega from "@/lib/api-client/omega-client/omega";
import { POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import { PatchOmegaWebClientResourceRequestDto, PatchOmegaWebClientLogoRequestDto } from "@/lib/dtos/omega/web/client/request.dto";
import { PostUserRequestDto } from "@/lib/dtos/user/user/request.dto";
import { GetUserArrayResponseDto } from "@/lib/dtos/user/user/response.dto";
import { revalidatePath } from "next/cache";

export const retriveUsers = async () => {
    const session = await auth();
    if (!session) throw new Error('Something went wrong');
    const { data }: GetUserArrayResponseDto = await omega().addToken(session.access_token).execute('userDetails');
    return data;
}

type CreateCredentialWithoutUser = Omit<POSTCredentialRequestDto, 'user'>;
type UpdateWebClientResource = PatchOmegaWebClientResourceRequestDto;
type UpdateLogo = PatchOmegaWebClientLogoRequestDto;
type CreateUserParam = PostUserRequestDto & CreateCredentialWithoutUser & UpdateWebClientResource & UpdateLogo;
export const createUser = async (data: CreateUserParam) => {
    const session = await auth();
    try {
        if (!session) throw new Error('Something went wrong');
        const userBody: PostUserRequestDto = data;
        const user = await omega().addToken(session.access_token).addBody(userBody).execute('userCreate');
        
        const { ...credentialWithoutUser }: CreateCredentialWithoutUser = data;
        const credentialBody: POSTCredentialRequestDto = { ...credentialWithoutUser, user: user.id }
        await omega().addToken(session.access_token).addBody(credentialBody).execute('credentialCreate');
        
        const { resources }: UpdateWebClientResource = data;
        await omega().addParams({ id: user.id }).addToken(session.access_token).addBody({ resources }).execute('webClientResourceUpdate');
        
        const { logo }: UpdateLogo = data;
        await omega().addParams({ id: user.id }).addToken(session.access_token).addBody({ logo: Number(logo) }).execute('webClientLogoUpdate');
        revalidatePath('omega/admin/user')
    } catch (error) {
        console.error(error);
        throw error;
    }
}