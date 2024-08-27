import { NextRequest, NextResponse } from "next/server";
import { PatchDiseaseRequestDto } from "@/lib/dtos/disease/request.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function POST(req: NextRequest) {
    try {
        const data: PatchDiseaseRequestDto = await req.json();
        const newDisease = await omega().addBody(data).execute('diseaseCreate');
        return NextResponse.json(newDisease, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}