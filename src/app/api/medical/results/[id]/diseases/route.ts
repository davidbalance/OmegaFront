import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/request.dto";
import { POSTMedicalResultDiseaseResponseDto } from "@/lib/dtos/medical/result/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: POSTMedicalResultDiseaseRequestDto = await req.json();
        const postResultDisease = withAuth<POSTMedicalResultDiseaseRequestDto, POSTMedicalResultDiseaseResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const newData: POSTMedicalResultDiseaseResponseDto = await postResultDisease(endpoints.MEDICAL.RESULT.FIND_ONE_RESULT_AND_INSERT_DISEASE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(newData, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}