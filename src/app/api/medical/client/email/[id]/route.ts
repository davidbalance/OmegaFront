import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostMedicalClientEmailRequestDto } from "@/lib/dtos/medical/client/email/request.dto";
import { PatchMedicalClientEmailResponseDto, PostMedicalClientEmailResponseDto } from "@/lib/dtos/medical/client/email/response.dto";
import { GetMedicalClientArrayResponseDto } from "@/lib/dtos/medical/client/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data }: GetMedicalClientArrayResponseDto = await omega().addParams({ dni: params.id }).execute('medicalClientEmailDetails');
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
    { params }: { params: { id: string } }
) {
    try {
        const body: PostMedicalClientEmailRequestDto = await req.json();
        const data: PostMedicalClientEmailResponseDto = await omega().addParams({ dni: params.id }).addBody(body).execute('medicalClientEmailCreate');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function PATCH(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchMedicalClientEmailResponseDto = await omega().addParams({ id: params.id }).addFlag('--no-body').execute('medicalClientEmailUpdate');
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
    { params }: { params: { id: number } }
) {
    try {
        await omega().addParams({ id: params.id }).execute('medicalClientEmailDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}