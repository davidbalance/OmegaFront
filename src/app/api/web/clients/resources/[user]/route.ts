import { PATCHWebClientResourceRequestDto } from "@/lib/dtos/web/clients.request.dto";
import { GETWebClientResourceResponseDto, PATCHWebClientResourceResponseDto } from "@/lib/dtos/web/clients.response.dto";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const getWebClientResources = withAuth<any, GETWebClientResourceResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { resources }: GETWebClientResourceResponseDto = await getWebClientResources(endpoints.WEB.CLIENT.RESOURCE.FIND_RESOURCES_BY_USER(params.user), {});
        return NextResponse.json(resources, { status: 200 });
    } catch (error) {
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
        const data: PATCHWebClientResourceRequestDto = await req.json();
        const patchWebClientResource = withAuth<PATCHWebClientResourceRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchWebClientResource(endpoints.WEB.CLIENT.RESOURCE.FIND_USER_AND_UPDATE_RESOURCES(params.user), { body: data });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}