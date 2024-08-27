import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchOmegaWebResourceRequestDto } from "@/lib/dtos/omega/web/resource/request.dto";
import { PatchOmegaWebResourceResponseDto } from "@/lib/dtos/omega/web/resource/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const body: PatchOmegaWebResourceRequestDto = await req.json();
        const resource: PatchOmegaWebResourceResponseDto = await omega().addParams({ id: params.id }).addBody(body).execute('webResourceUpdate');
        return NextResponse.json(resource, { status: 200 });
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
        await omega().addParams({ id: params.id }).execute('webResourceDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}