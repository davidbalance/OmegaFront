import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PATCHMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/request.dto";
import { PATCHMedicalResultDiseaseResponseDto } from "@/lib/dtos/medical/result/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number, disease: number } }
) {
    try {
        const { id, disease } = params;
        const data: PATCHMedicalResultDiseaseRequestDto = await req.json();
        const patchResultDisease = withAuth<PATCHMedicalResultDiseaseRequestDto, PATCHMedicalResultDiseaseResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const newData: PATCHMedicalResultDiseaseResponseDto = await patchResultDisease(endpoints.MEDICAL.RESULT.FIND_ONE_RESULT_AND_UPDATE_DISEASE(id, disease), {
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: number, disease: number } }
) {
    try {
        const { id, disease } = params;
        const deleteResultDisease = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteResultDisease(endpoints.MEDICAL.RESULT.FIND_ONE_RESULT_AND_DELETE_DISEASE(id, disease), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}