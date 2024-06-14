import { GETMedicalOrderFilesResponseDto } from "@/lib/dtos/medical/order/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const order: GETMedicalOrderFilesResponseDto = await get<GETMedicalOrderFilesResponseDto>(endpoints.MEDICAL.ORDER.FIND_FILES(params.id));
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}
