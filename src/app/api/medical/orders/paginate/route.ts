import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { GETArrayWithPaginationResponseDto, PlainMedicalOrder } from "@/lib/dtos/medical/order/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { PaginationResponse } from "@/lib/types/pagination.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const data = await req.json();
        const postOrderWithPagination = withAuth<any, GETArrayWithPaginationResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const { pages, orders }: GETArrayWithPaginationResponseDto = await postOrderWithPagination(endpoints.MEDICAL.ORDER.FIND_WITH_PAGINATION, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        const paginationObj: PaginationResponse<PlainMedicalOrder> = { pages: pages, data: orders };
        return NextResponse.json(paginationObj, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}