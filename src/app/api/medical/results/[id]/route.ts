import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchMedicalResultExamRequest } from "@/lib/dtos/medical/result/exam/request.dto";
import { PatchMedicalResultResponseDto } from "@/lib/dtos/medical/result/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const body: PatchMedicalResultExamRequest = await req.json();
        const patchMedicalResult = withAuth<PatchMedicalResultExamRequest, PatchMedicalResultResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const data: PatchMedicalResultResponseDto = await patchMedicalResult(endpoints.MEDICAL.RESULT.UPDATE_ONE(params.id), {
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