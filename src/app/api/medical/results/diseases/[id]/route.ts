import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PATCHMedicalResultWithDiseaseArrayRequestDto } from "@/lib/dtos/medical/result/request.dto";
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
        const data: PATCHMedicalResultWithDiseaseArrayRequestDto = await req.json();
        const patchExamResult = withAuth<PATCHMedicalResultWithDiseaseArrayRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchExamResult(endpoints.MEDICAL.RESULT.FIND_ONE_AND_UPDATE_DISEASE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}