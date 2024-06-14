import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { GETUsersResponseDto, POSTUserResponseDto } from "@/lib/dtos/user/user.response.dto";
import { POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import { PATCHWebClientLogoRequestDto, PATCHWebClientResourceRequestDto } from "@/lib/dtos/web/clients.request.dto";
import { POSTUserRequestDto } from "@/lib/dtos/user/user.request.dto";

export async function GET() {
    try {
        const getUsers = withAuth<any, GETUsersResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { users }: GETUsersResponseDto = await getUsers(endpoints.USER.USER.FIND_ALL, {});
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

type CreateCredentialWithoutUser = Omit<POSTCredentialRequestDto, 'user'>;
type UpdateWebClientResource = Omit<PATCHWebClientResourceRequestDto, 'user'>;
type UpdateLogo = PATCHWebClientLogoRequestDto;
type CreateUserParam = POSTUserRequestDto & CreateCredentialWithoutUser & UpdateWebClientResource & UpdateLogo;
export async function POST(req: NextRequest) {
    try {
        const data: CreateUserParam = await req.json();

        const userBody: POSTUserRequestDto = data;
        const postUser = withAuth<POSTUserRequestDto, POSTUserResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const user = await postUser(endpoints.USER.USER.CREATE, { body: userBody });

        const { ...credentialWithoutUser }: CreateCredentialWithoutUser = data;
        const credentialBody: POSTCredentialRequestDto = { ...credentialWithoutUser, user: user.id! }
        const postCredential = withAuth<any, POSTCredentialRequestDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await postCredential(endpoints.AUTHENTICATION.CREDENTIAL.CREATE, { body: credentialBody });

        const { resources }: UpdateWebClientResource = data;
        const patchRole = withAuth<any, PATCHWebClientResourceRequestDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchRole(endpoints.WEB.CLIENT.RESOURCE.FIND_USER_AND_UPDATE_RESOURCES(user.id!), { body: { resources } });

        const { logo }: UpdateLogo = data;
        const patchLogo = withAuth<any, PATCHWebClientLogoRequestDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchLogo(endpoints.WEB.CLIENT.LOGO.FIND_USER_AND_UPDATE_LOGO(user.id!), { body: { logo } });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}