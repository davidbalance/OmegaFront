import { GETWebResourcesResponseDto, POSTWebResourceResponseDto } from "@/lib/dtos/web/resources.response.dto";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { POSTWebFullResourceRequestDto } from "@/lib/dtos/web/resources.request.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";

export async function GET() {
    try {
        const getResource = withAuth<any, GETWebResourcesResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { resources }: GETWebResourcesResponseDto = await getResource(endpoints.WEB.RESOURCE.FIND_ALL, {});
        return NextResponse.json(resources, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const body: POSTWebFullResourceRequestDto = await req.json();
        const postResource = withAuth<POSTWebFullResourceRequestDto, POSTWebResourceResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const resource: POSTWebResourceResponseDto = await postResource(endpoints.WEB.RESOURCE.CREATE_RESOURCES, {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(resource, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}