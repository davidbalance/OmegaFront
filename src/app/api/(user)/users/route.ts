import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { GetUserArrayResponseDto, PostUserResponseDto } from "@/lib/dtos/user/user/response.dto";
import { PostUserRequestDto } from "@/lib/dtos/user/user/request.dto";
import { PatchOmegaWebClientLogoRequestDto, PatchOmegaWebClientResourceRequestDto } from "@/lib/dtos/omega/web/client/request.dto";

export async function GET() {
    try {
        const getUsers = withAuth<any, GetUserArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetUserArrayResponseDto = await getUsers(endpoints.USER.USER.FIND_ALL, {});
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

type CreateCredentialWithoutUser = Omit<POSTCredentialRequestDto, 'user'>;
type UpdateWebClientResource = PatchOmegaWebClientResourceRequestDto;
type UpdateLogo = PatchOmegaWebClientLogoRequestDto;
type CreateUserParam = PostUserRequestDto & CreateCredentialWithoutUser & UpdateWebClientResource & UpdateLogo;
export async function POST(req: NextRequest) {
    try {
        const data: CreateUserParam = await req.json();

        const userBody: PostUserRequestDto = data;
        const postUser = withAuth<PostUserRequestDto, PostUserResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const user = await postUser(endpoints.USER.USER.CREATE, {
            body: userBody,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });

        const { ...credentialWithoutUser }: CreateCredentialWithoutUser = data;
        const credentialBody: POSTCredentialRequestDto = { ...credentialWithoutUser, user: user.id! }
        const postCredential = withAuth<any, POSTCredentialRequestDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await postCredential(endpoints.AUTHENTICATION.CREDENTIAL.CREATE, {
            body: credentialBody,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });

        const { resources }: UpdateWebClientResource = data;
        const patchRole = withAuth<any, PatchOmegaWebClientResourceRequestDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchRole(endpoints.OMEGA.WEB.CLIENT.RESOURCE.UPDATE_RESOURCES(user.id!), {
            body: { resources },
            headers: CONTENT_TYPE_APPLICATION_JSON
        });

        const { logo }: UpdateLogo = data;
        const patchLogo = withAuth<any, PatchOmegaWebClientLogoRequestDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchLogo(endpoints.OMEGA.WEB.CLIENT.LOGO.UPDATE_ONE(user.id!), {
            body: { logo },
            headers: CONTENT_TYPE_APPLICATION_JSON
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}