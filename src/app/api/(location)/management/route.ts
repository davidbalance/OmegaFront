import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostManagementRequestDto } from "@/lib/dtos/location/management/request.dto";
import { GetManagementArrayResponseDto, PostManagementResponseDto } from "@/lib/dtos/location/management/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { data }: GetManagementArrayResponseDto = await omega().execute('managementDetails');
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
        const data: PostManagementRequestDto = await req.json();
        const management: PostManagementResponseDto = await omega().addBody(data).execute('managementCreate');
        return NextResponse.json(management, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}