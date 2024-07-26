import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchOmegaWebClientLogoRequestDto } from "@/lib/dtos/omega/web/client/request.dto";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const data: PatchOmegaWebClientLogoRequestDto = await req.json();
        const patchWebClientLogo = withAuth<PatchOmegaWebClientLogoRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchWebClientLogo(endpoints.OMEGA.WEB.CLIENT.LOGO.UPDATE_ONE(params.user), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}