import { NextRequest, NextResponse } from "next/server";
import { GetOmegaWebResourceArrayResponseDto, PostOmegaWebResourceResponseDto } from "@/lib/dtos/omega/web/resource/response.dto";
import { PostOmegaWebResourceRequestDto } from "@/lib/dtos/omega/web/resource/request.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function GET() {
    try {
        const { data }: GetOmegaWebResourceArrayResponseDto = await omega().execute('webResourceDetails');
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
        const body: PostOmegaWebResourceRequestDto = await req.json();
        const resource: PostOmegaWebResourceResponseDto = await omega().addBody(body).execute('webResourceCreate');
        return NextResponse.json(resource, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}