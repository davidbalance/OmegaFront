import { NextRequest, NextResponse } from "next/server";
import { PatchDiseaseRequestDto } from "@/lib/dtos/disease/request.dto";
import { PatchDiseaseResponseDto } from "@/lib/dtos/disease/response.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchDiseaseRequestDto = await req.json();
        const disease: PatchDiseaseResponseDto = await omega().addParams({ id: params.id }).addBody(data).execute('diseaseUpdate');
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
        await omega().addParams({ id: params.id }).execute('diseaseDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}