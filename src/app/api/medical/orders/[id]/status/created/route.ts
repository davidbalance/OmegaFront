import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const patchOrder = withAuth<any, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchOrder(endpoints.MEDICAL.ORDER.FIND_ONE_AND_CREATED_STATUS(params.id), { cache: false });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}