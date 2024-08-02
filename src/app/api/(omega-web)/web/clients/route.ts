import { GetOmegaWebClientResponseDto } from "@/lib/dtos/omega/web/client/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getOmegaWebClient = withAuth<any, GetOmegaWebClientResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GetOmegaWebClientResponseDto = await getOmegaWebClient(endpoints.OMEGA.WEB.CLIENT.FIND, {});
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}