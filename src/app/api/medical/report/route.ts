import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostMedicalReportRequestDto } from "@/lib/dtos/medical/report/request.dto";
import { PostMedicalReportResponseDto } from "@/lib/dtos/medical/report/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: PostMedicalReportRequestDto = await req.json();
        const postMedicalReport = withAuth<PostMedicalReportRequestDto, PostMedicalReportResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const medicalReport = await postMedicalReport(endpoints.MEDICAL.REPORT.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(medicalReport, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}