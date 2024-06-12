import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { FindSelectorOptionsDisease } from "@/services/api/disease/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { group: number } }
) {
    try {
        const getDiseaseSelector = withAuth<any, FindSelectorOptionsDisease>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { options }: FindSelectorOptionsDisease = await getDiseaseSelector(endpoints.DISEASE.V1.FIND_SELECTOR(`${params.group}`), {});
        return NextResponse.json(options, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}