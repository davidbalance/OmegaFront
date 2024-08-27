import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import { GetMedicalResultDiseaseResponseDto, PatchMedicalResultDiseaseResponseDto } from "@/lib/dtos/medical/result/disease/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const disease: GetMedicalResultDiseaseResponseDto = await omega().addParams({ id: params.id }).execute('medicalResultDiseaseDetail');
        return NextResponse.json(disease, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchMedicalResultDiseaseRequestDto = await req.json();
        const disease: PatchMedicalResultDiseaseResponseDto = await omega().addParams({ id: params.id }).addBody(data).execute('medicalResultDiseaseUpdate');
        return NextResponse.json(disease, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        await omega().addParams({ id: params.id }).execute('medicalResultDiseaseDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}