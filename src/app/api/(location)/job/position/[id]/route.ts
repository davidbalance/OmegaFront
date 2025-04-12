import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchJobPositionRequestDto } from "@/lib/dtos/location/job/position/request.dto";
import { GetJobPositionResponseDto, PatchJobPositionResponseDto } from "@/lib/dtos/location/job/position/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch, del } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const getJobPositon = withAuth<any, GetJobPositionResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const jobPosition: GetJobPositionResponseDto = await getJobPositon(endpoints.LOCATION.JOB_POSITION.FIND_ONE(params.id), {});
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

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchJobPositionRequestDto = await req.json();
        const patchJobPosition = withAuth<PatchJobPositionRequestDto, PatchJobPositionResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const jobPosition: PatchJobPositionResponseDto = await patchJobPosition(endpoints.LOCATION.JOB_POSITION.UPDATE_ONE(params.id), {
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

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const deleteJobPosition = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteJobPosition(endpoints.LOCATION.JOB_POSITION.DELETE_ONE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}