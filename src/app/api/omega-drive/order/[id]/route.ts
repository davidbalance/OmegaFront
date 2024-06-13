import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { FindOrderFilesResponseDTO } from "@/services/api/order/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const order: FindOrderFilesResponseDTO = await get<FindOrderFilesResponseDTO>(endpoints.ORDER.V1.FIND_FILES_BY_ID(params.id), { cache: false });
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}
