import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTAreaRequestDto } from "@/lib/dtos/location/area/request.dto";
import { GETAreaArrayResponseDto, POSTAreaResponseDto } from "@/lib/dtos/location/area/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getArea = withAuth<any, GETAreaArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { areas }: GETAreaArrayResponseDto = await getArea(endpoints.LOCATION.AREA.FIND_ALL, {});
        return NextResponse.json(areas, { status: 200 });
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
        const data: POSTAreaRequestDto = await req.json();
        const postArea = withAuth<POSTAreaRequestDto, POSTAreaResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const area: POSTAreaResponseDto = await postArea(endpoints.LOCATION.AREA.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(area, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}