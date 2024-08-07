import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchApiKeyRequestDto } from "@/lib/dtos/auth/api/key/request.dto";
import { PatchApiKeyResponseDto } from "@/lib/dtos/auth/api/key/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchApiKeyRequestDto = await req.json();
        const patchApiKey = withAuth<PatchApiKeyRequestDto, PatchApiKeyResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const apikey: PatchApiKeyResponseDto = await patchApiKey(endpoints.AUTHENTICATION.API_KEY.UPDATE_ONE(params.id),
            {
                body: data,
                headers: CONTENT_TYPE_APPLICATION_JSON
            }
        );
        return NextResponse.json(apikey, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}