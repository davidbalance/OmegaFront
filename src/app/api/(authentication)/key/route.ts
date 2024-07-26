import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostApiKeyRequestDto } from "@/lib/dtos/auth/api/key/request.dto";
import { GetApiKeyArrayResponseDto, PostApiKeyResponseDto } from "@/lib/dtos/auth/api/key/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getApiKey = withAuth<any, GetApiKeyArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetApiKeyArrayResponseDto = await getApiKey(endpoints.AUTHENTICATION.API_KEY.FIND_ALL, {});
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

export async function POST(
    req: NextRequest
) {
    try {
        const data: PostApiKeyRequestDto = await req.json();
        const postApiKey = withAuth<PostApiKeyRequestDto, PostApiKeyResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const apikey: PostApiKeyResponseDto = await postApiKey(endpoints.AUTHENTICATION.API_KEY.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(apikey, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}