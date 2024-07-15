import { GETMedicalOrderArrayResponseDto } from "@/lib/dtos/medical/order/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
) {
    try {
        const { ruc }: { ruc: string } = await req.json();
        const getOrder = withAuth<any, GETMedicalOrderArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { orders }: GETMedicalOrderArrayResponseDto = await getOrder(endpoints.MEDICAL.ORDER.FIND_BY_COMPANY(ruc), { cache: false });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}