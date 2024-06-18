import { PATCHMedicalResultReportRequestDto } from "@/lib/dtos/medical/result/request.dto";
import { PATCHMedicalResultReportResponseDto } from "@/lib/dtos/medical/result/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PATCHMedicalResultReportRequestDto = await req.json();
        const patchReport = withAuth<PATCHMedicalResultReportRequestDto, PATCHMedicalResultReportResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const medicalResult: PATCHMedicalResultReportResponseDto = await patchReport(endpoints.MEDICAL.RESULT.FIND_ONE_AND_ATTACH_REPORT(params.id), { body: data });
        return NextResponse.json(medicalResult, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}