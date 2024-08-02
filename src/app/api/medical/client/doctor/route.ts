import { GetMedicalClientArrayResponseDto } from "@/lib/dtos/medical/client/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getClient = withAuth<any, GetMedicalClientArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetMedicalClientArrayResponseDto = await getClient(endpoints.MEDICAL.CLIENT.FIND_WITH_DOCTOR, {});
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}