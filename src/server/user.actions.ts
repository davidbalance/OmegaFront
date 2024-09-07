'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route"
import omega from "@/lib/api-client/omega-client/omega";
import { POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import { PatchOmegaWebClientResourceRequestDto, PatchOmegaWebClientLogoRequestDto } from "@/lib/dtos/omega/web/client/request.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { User } from "@/lib/dtos/user/user/base.response.dto";
import { PostUserRequestDto, PatchUserRequestDto } from "@/lib/dtos/user/user/request.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const searchUsers = async (filter: FilterMeta): Promise<User[]> => {
    const session = await auth();
    const { data }: ObjectArray<User> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('userSearch');
    return data;
}

export const countUsers = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('userPages');
    return pages;
}

export const retriveUser = async (id: number): Promise<User> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const data: User = await omega().addParams({ id }).addToken(session.access_token).execute('userDetail');
    return data;
}

type CreateCredentialWithoutUser = Omit<POSTCredentialRequestDto, 'user'>;
type UpdateWebClientResource = PatchOmegaWebClientResourceRequestDto;
type UpdateLogo = PatchOmegaWebClientLogoRequestDto;
type CreateUserParam = PostUserRequestDto & CreateCredentialWithoutUser & UpdateWebClientResource & UpdateLogo;
export const createUser = async (data: CreateUserParam) => {
    const session = await auth();
    try {
        if (!session) throw new Error('There is no session found');
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

export const updateUser = async (id: number, data: PatchUserRequestDto) => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addParams({ id })
        .addBody(data)
        .addToken(session.access_token)
        .execute('userUpdate');
    revalidatePath('omega/admin/user');
}

export const deleteUser = async (id: number) => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .execute('userDelete');
    revalidatePath('');
} 