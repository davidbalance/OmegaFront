import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchMedicalClientJobPositionRequestDto } from "@/lib/dtos/medical/client/job/position/request.dto";
import { GetMedicalClientJobPositionResponseDto, PatchMedicalClientJobPositionResponseDto } from "@/lib/dtos/medical/client/job/position/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const data: GetMedicalClientJobPositionResponseDto = await omega().addParams({ dni: params.dni }).execute('jobpositionDetail');
        return NextResponse.json(data.jobPositionName || null, { status: 200 });
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
    { params }: { params: { dni: string } }
) {
    try {
        const body: PatchMedicalClientJobPositionRequestDto = await req.json();
        const data: PatchMedicalClientJobPositionResponseDto = await omega().addParams({ dni: params.dni }).addBody(body).execute('jobpositionUpdate');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        await omega().addParams({ dni: params.dni }).execute('jobpositionDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}