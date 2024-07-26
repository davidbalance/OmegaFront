import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { PatchDiseaseRequestDto } from "@/lib/dtos/disease/request.dto";
import { PatchDiseaseResponseDto } from "@/lib/dtos/disease/response.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchDiseaseRequestDto = await req.json();
        const patchDisease = withAuth<PatchDiseaseRequestDto, PatchDiseaseResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const disease: PatchDiseaseResponseDto = await patchDisease(endpoints.DISEASE.DISEASE.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(disease, { status: 200 });
    } catch (error) {
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
        const deleteDisease = withAuth(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteDisease(endpoints.DISEASE.DISEASE.DELETE_ONE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}