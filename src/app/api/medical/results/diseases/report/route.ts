import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostMedicalResultDiseaseReportRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: PostMedicalResultDiseaseReportRequestDto = await req.json();
        const postDisease = withAuth<PostMedicalResultDiseaseReportRequestDto, Blob>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const blob: Blob = await postDisease(endpoints.MEDICAL.RESULT.DISEASE.REPORT, {
            type: 'blob',
            body: data,
            headers: { 'Accept': 'application/*', ...CONTENT_TYPE_APPLICATION_JSON }
        });
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}