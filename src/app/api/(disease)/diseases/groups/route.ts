import { NextRequest, NextResponse } from "next/server";
import { GetDiseaseGroupArrayResponseDto, PostDiseaseGroupResponseDto } from "@/lib/dtos/disease/group/response.dto";
import { PostDiseaseGroupRequestDto } from "@/lib/dtos/disease/group/request.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function GET() {
    try {
        const { data }: GetDiseaseGroupArrayResponseDto = await omega().execute('diseaseGroupDetails');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data: PostDiseaseGroupRequestDto = await req.json();
        const group: PostDiseaseGroupResponseDto = await omega().addBody(data).execute('diseaseGroupCreate');
        return NextResponse.json(group, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}