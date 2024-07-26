import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostJobPositionRequestDto } from "@/lib/dtos/location/job/position/request.dto";
import { GetJobPositionArrayResponseDto, PostJobPositionResponseDto } from "@/lib/dtos/location/job/position/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        const getJobPosition = withAuth<any, GetJobPositionArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetJobPositionArrayResponseDto = await getJobPosition(endpoints.LOCATION.JOB_POSITION.FIND_ALL, {});
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
        const data: PostJobPositionRequestDto = await req.json();
        const postJobPosition = withAuth<PostJobPositionRequestDto, PostJobPositionResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const jobPosition: PostJobPositionResponseDto = await postJobPosition(endpoints.LOCATION.JOB_POSITION.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(jobPosition, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}