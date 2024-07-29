import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { GetMedicalOrderFlatPaginationResponseDto } from "@/lib/dtos/medical/order/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json();
        const postOrderWithPagination = withAuth<any, GetMedicalOrderFlatPaginationResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GetMedicalOrderFlatPaginationResponseDto = await postOrderWithPagination(endpoints.MEDICAL.ORDER.FIND_WITH_PAGINATION, {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
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