import { NextRequest, NextResponse } from "next/server";
import { PatchOmegaWebClientLogoRequestDto } from "@/lib/dtos/omega/web/client/request.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const data: PatchOmegaWebClientLogoRequestDto = await req.json();
        await omega().addParams({ id: params.user }).addBody(data).execute('webClientLogoUpdate');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}