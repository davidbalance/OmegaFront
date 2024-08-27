import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostMedicalReportRequestDto } from "@/lib/dtos/medical/report/request.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: PostMedicalReportRequestDto = await req.json();
        const medicalReport = await omega().addBody(data).execute('medicalReportCreate');
        return NextResponse.json(medicalReport, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}