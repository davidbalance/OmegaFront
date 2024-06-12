import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { Order } from "@/services/api/order/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const order: Order = await get(endpoints.ORDER.V1.FIND_BY_ID(params.id), {});
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}