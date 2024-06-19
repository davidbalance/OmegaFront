import { GETWebClientResourceResponseDto } from "@/lib/dtos/web/clients.response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
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