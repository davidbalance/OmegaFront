import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTManagementRequestDto } from "@/lib/dtos/location/management/request.dto";
import { GETManagementArrayResponseDto, POSTManagementResponseDto } from "@/lib/dtos/location/management/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getManagement = withAuth<any, GETManagementArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { managements }: GETManagementArrayResponseDto = await getManagement(endpoints.LOCATION.MANAGEMENT.FIND_ALL, {});
        return NextResponse.json(managements, { status: 200 });
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
        const data: POSTManagementRequestDto = await req.json();
        const postManagement = withAuth<POSTManagementRequestDto, POSTManagementResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const management: POSTManagementResponseDto = await postManagement(endpoints.LOCATION.MANAGEMENT.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(management, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}