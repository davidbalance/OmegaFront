import { NextRequest, NextResponse } from "next/server";
import { POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import { GetUserArrayResponseDto } from "@/lib/dtos/user/user/response.dto";
import { PostUserRequestDto } from "@/lib/dtos/user/user/request.dto";
import { PatchOmegaWebClientLogoRequestDto, PatchOmegaWebClientResourceRequestDto } from "@/lib/dtos/omega/web/client/request.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function GET() {
    try {
        const { data }: GetUserArrayResponseDto = await omega().execute('userDetails');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
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
        const user = await omega().addBody(userBody).execute('userCreate');

        const { ...credentialWithoutUser }: CreateCredentialWithoutUser = data;
        const credentialBody: POSTCredentialRequestDto = { ...credentialWithoutUser, user: user.id }
        await omega().addBody(credentialBody).execute('credentialCreate');

        const { resources }: UpdateWebClientResource = data;
        await omega().addParams({ id: user.id }).addBody({ resources }).execute('webClientResourceUpdate');

        const { logo }: UpdateLogo = data;
        await omega().addParams({ id: user.id }).addBody({ logo }).execute('webClientLogoUpdate');

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}