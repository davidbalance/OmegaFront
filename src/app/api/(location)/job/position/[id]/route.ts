import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchJobPositionRequestDto } from "@/lib/dtos/location/job/position/request.dto";
import { GetJobPositionResponseDto, PatchJobPositionResponseDto } from "@/lib/dtos/location/job/position/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const jobPosition: GetJobPositionResponseDto = await omega().addParams({ id: params.id }).execute('jobpositionDetail');
        return NextResponse.json(jobPosition, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchJobPositionRequestDto = await req.json();
        const jobPosition: PatchJobPositionResponseDto = await omega().addParams({ id: params.id }).addBody(data).execute('jobpositionUpdate');
        return NextResponse.json(jobPosition, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        await omega().addParams({ id: params.id }).execute('jobpositionDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}