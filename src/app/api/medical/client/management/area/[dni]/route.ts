import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostMedicalClientEmailResponseDto } from "@/lib/dtos/medical/client/email/response.dto";
import { PostMedicalClientManagementRequest } from "@/lib/dtos/medical/client/management/base.request.dto";
import { GetMedicalClientManagementResponseDto } from "@/lib/dtos/medical/client/management/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const data: GetMedicalClientManagementResponseDto = await omega().addParams({ dni: params.dni }).execute('medicalClientManagementDetail');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const body: PostMedicalClientManagementRequest = await req.json();
        const data: PostMedicalClientEmailResponseDto = await omega().addParams({ dni: params.dni }).addBody(body).execute('medicalClientManagementCreate');
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
    _: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        await omega().addParams({ dni: params.dni }).execute('medicalClientManagementDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}