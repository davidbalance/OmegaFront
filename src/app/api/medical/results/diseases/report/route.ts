import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostMedicalResultDiseaseReportRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: PostMedicalResultDiseaseReportRequestDto = await req.json();
        const blob: Blob = await omega().addBody(data).addHeader({ 'accept': 'application/*' }).execute('medicalResultDiseaseExport');
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}