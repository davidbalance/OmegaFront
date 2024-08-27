import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchMedicalResultExamRequest } from "@/lib/dtos/medical/result/exam/request.dto";
import { PatchMedicalResultResponseDto } from "@/lib/dtos/medical/result/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const body: PatchMedicalResultExamRequest = await req.json();
        const data: PatchMedicalResultResponseDto = await omega().addParams({ id: params.id }).addBody(body).execute('medicalResultUpdateDisease');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}