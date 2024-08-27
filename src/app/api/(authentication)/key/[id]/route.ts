import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchApiKeyRequestDto } from "@/lib/dtos/auth/api/key/request.dto";
import { PatchApiKeyResponseDto } from "@/lib/dtos/auth/api/key/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchApiKeyRequestDto = await req.json();
        const apikey: PatchApiKeyResponseDto = await omega().addParams({ id: params.id }).addBody(data).execute('apikeyUpdate');
        return NextResponse.json(apikey, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}