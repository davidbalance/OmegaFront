import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchMedicalClientJobPositionRequestDto } from "@/lib/dtos/medical/client/job/position/request.dto";
import { GetMedicalClientJobPositionResponseDto, PatchMedicalClientJobPositionResponseDto } from "@/lib/dtos/medical/client/job/position/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const getJobPosition = withAuth<any, GetMedicalClientJobPositionResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GetMedicalClientJobPositionResponseDto = await getJobPosition(endpoints.MEDICAL.CLIENT.JOB_POSITION.FIND_ONE(params.dni), {
            cache: false
        });
        return NextResponse.json(data.jobPositionName || null, { status: 200 });
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
    { params }: { params: { dni: string } }
) {
    try {
        const body: PatchMedicalClientJobPositionRequestDto = await req.json();
        const patchJobPosition = withAuth<PatchMedicalClientJobPositionRequestDto, PatchMedicalClientJobPositionResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const data: PatchMedicalClientJobPositionResponseDto = await patchJobPosition(endpoints.MEDICAL.CLIENT.JOB_POSITION.UPDATE_ONE(params.dni), {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
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