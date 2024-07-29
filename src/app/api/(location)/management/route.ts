import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostManagementRequestDto } from "@/lib/dtos/location/management/request.dto";
import { GetManagementArrayResponseDto, PostManagementResponseDto } from "@/lib/dtos/location/management/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getManagement = withAuth<any, GetManagementArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetManagementArrayResponseDto = await getManagement(endpoints.LOCATION.MANAGEMENT.FIND_ALL, {});
        return NextResponse.json(data, { status: 200 });
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
        const data: PostManagementRequestDto = await req.json();
        const postManagement = withAuth<PostManagementRequestDto, PostManagementResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const management: PostManagementResponseDto = await postManagement(endpoints.LOCATION.MANAGEMENT.CREATE, {
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