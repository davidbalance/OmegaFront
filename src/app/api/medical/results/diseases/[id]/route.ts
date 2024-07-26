import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import { GetMedicalResultDiseaseResponseDto, PatchMedicalResultDiseaseResponseDto } from "@/lib/dtos/medical/result/disease/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, get, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const getDisease = withAuth<any, GetMedicalResultDiseaseResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const disease: GetMedicalResultDiseaseResponseDto = await getDisease(endpoints.MEDICAL.RESULT.DISEASE.FIND_ONE(params.id), {});
        return NextResponse.json(disease, { status: 200 });
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
        const data: PatchMedicalResultDiseaseRequestDto = await req.json();
        const patchDisease = withAuth<PatchMedicalResultDiseaseRequestDto, PatchMedicalResultDiseaseResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const disease: PatchMedicalResultDiseaseResponseDto = await patchDisease(endpoints.MEDICAL.RESULT.DISEASE.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(disease, { status: 200 });
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
        const deleteDisease = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteDisease(endpoints.MEDICAL.RESULT.DISEASE.DELETE_ONE(params.id), {});
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