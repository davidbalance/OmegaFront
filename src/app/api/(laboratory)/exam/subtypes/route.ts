import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostExamSubtypeRequestDto } from "@/lib/dtos/laboratory/exam/subtype/request.dto";
import { GetExamSubtypeArrayResponseDto, PostExamSubtypeResponseDto } from "@/lib/dtos/laboratory/exam/subtype/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { data }: GetExamSubtypeArrayResponseDto = await omega().execute('examsubtypeDetails');
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
        const data: PostExamSubtypeRequestDto = await req.json();
        const subtype: PostExamSubtypeResponseDto = await omega().addBody(data).execute('examsubtypeCreate');
        return NextResponse.json(subtype, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}