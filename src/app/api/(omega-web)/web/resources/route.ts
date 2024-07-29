import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { GetOmegaWebResourceArrayResponseDto, PostOmegaWebResourceResponseDto } from "@/lib/dtos/omega/web/resource/response.dto";
import { PostOmegaWebResourceRequestDto } from "@/lib/dtos/omega/web/resource/request.dto";

export async function GET() {
    try {
        const getResource = withAuth<any, GetOmegaWebResourceArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetOmegaWebResourceArrayResponseDto = await getResource(endpoints.OMEGA.WEB.RESOURCE.FIND_ALL, {});
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

export async function POST(req: NextRequest) {
    try {
        const body: PostOmegaWebResourceRequestDto = await req.json();
        const postResource = withAuth<PostOmegaWebResourceRequestDto, PostOmegaWebResourceResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const resource: PostOmegaWebResourceResponseDto = await postResource(endpoints.OMEGA.WEB.RESOURCE.CREATE, {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(resource, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}