import { NextRequest, NextResponse } from "next/server";
import { PatchOmegaWebClientResourceRequestDto } from "@/lib/dtos/omega/web/client/request.dto";
import { GetOmegaWebClientResourceArrayResponseDto } from "@/lib/dtos/omega/web/client/response.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function GET(
    _: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const { data }: GetOmegaWebClientResourceArrayResponseDto = await omega().addParams({ id: params.user }).execute('webClientResourceDetails');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const data: PatchOmegaWebClientResourceRequestDto = await req.json();
        await omega().addParams({ id: params.user }).addBody(data).execute('webClientResourceUpdate');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}