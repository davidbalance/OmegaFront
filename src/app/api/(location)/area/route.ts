import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostAreaRequestDto } from "@/lib/dtos/location/area/request.dto";
import { GetAreaArrayResponseDto } from "@/lib/dtos/location/area/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { data }: GetAreaArrayResponseDto = await omega().execute('areaDetails');
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
        const data: PostAreaRequestDto = await req.json();
        const area: PostAreaRequestDto = await omega().addBody(data).execute('areaCreate');
        return NextResponse.json(area, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}