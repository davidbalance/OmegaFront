import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import { GetMedicalResultDiseaseArrayResponseDto } from "@/lib/dtos/medical/result/disease/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: PostMedicalResultDiseaseRequestDto = await req.json();
        const disease = await omega().addBody(data).execute('medicalResultDiseaseCreate');
        return NextResponse.json(disease, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data }: GetMedicalResultDiseaseArrayResponseDto = await omega().execute('medicalResultDiseaseDetails');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}