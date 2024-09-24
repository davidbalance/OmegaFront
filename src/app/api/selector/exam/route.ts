import { GetSelectorOptionResponseDto } from "@/lib/dtos/selector/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getGroupSelector = withAuth<any, GetSelectorOptionResponseDto<number>>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { options }: GetSelectorOptionResponseDto<number> = await getGroupSelector(endpoints.SELECTOR.EXAM, {});
        return NextResponse.json(options, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}