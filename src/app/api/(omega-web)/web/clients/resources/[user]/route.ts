import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchOmegaWebClientResourceRequestDto } from "@/lib/dtos/omega/web/client/request.dto";
import { GetOmegaWebClientResourceArrayResponseDto } from "@/lib/dtos/omega/web/client/response.dto";

export async function GET(
    _: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const getWebClientResources = withAuth<any, GetOmegaWebClientResourceArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetOmegaWebClientResourceArrayResponseDto = await getWebClientResources(endpoints.OMEGA.WEB.CLIENT.RESOURCE.FIND_RESOURCES(params.user), { cache: false });
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

export async function PATCH(req: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const data: PatchOmegaWebClientResourceRequestDto = await req.json();
        const patchWebClientResource = withAuth<PatchOmegaWebClientResourceRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchWebClientResource(endpoints.OMEGA.WEB.CLIENT.RESOURCE.UPDATE_RESOURCES(params.user), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}