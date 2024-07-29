import { GetMedicalOrderArrayResponseDto } from "@/lib/dtos/medical/order/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }) {
    try {
        const getOrder = withAuth<any, GetMedicalOrderArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetMedicalOrderArrayResponseDto = await getOrder(endpoints.MEDICAL.ORDER.FIND_BY_PATIENT_AND_DOCTOR(params.dni), { cache: false });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}