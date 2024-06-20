import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { GETSelectorOptionResponseDto } from "@/lib/dtos/selector/response.dto";

export async function GET(
    _: NextRequest,
    { params }: { params: { group: number } }
) {
    try {
        const getDiseaseSelector = withAuth<any, GETSelectorOptionResponseDto<number>>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { options }: GETSelectorOptionResponseDto<number> = await getDiseaseSelector(endpoints.SELECTOR.DISEASE(params.group), {});
        return NextResponse.json(options, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}