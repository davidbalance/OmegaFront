import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { GetMedicalOrderFlatPaginationResponseDto } from "@/lib/dtos/medical/order/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json();
        const data: GetMedicalOrderFlatPaginationResponseDto = await omega().addBody(body).execute('medicalOrderPagination');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}