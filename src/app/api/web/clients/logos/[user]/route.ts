import { PATCHWebClientLogoRequestDto } from "@/lib/dtos/web/clients.request.dto";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest,
    { params }: { params: { user: number } }
) {
    try {
        const data: PATCHWebClientLogoRequestDto = await req.json();
        const patchWebClientLogo = withAuth<PATCHWebClientLogoRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchWebClientLogo(endpoints.WEB.CLIENT.LOGO.FIND_USER_AND_UPDATE_LOGO(params.user), { body: data });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}