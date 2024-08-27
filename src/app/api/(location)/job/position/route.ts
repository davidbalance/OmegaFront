import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostJobPositionRequestDto } from "@/lib/dtos/location/job/position/request.dto";
import { GetJobPositionArrayResponseDto, PostJobPositionResponseDto } from "@/lib/dtos/location/job/position/response.dto";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        const { data }: GetJobPositionArrayResponseDto = await omega().execute('jobpositionDetails');
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
        const data: PostJobPositionRequestDto = await req.json();
        const jobPosition: PostJobPositionResponseDto = await omega().addBody(data).execute('jobpositionCreate');
        return NextResponse.json(jobPosition, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}