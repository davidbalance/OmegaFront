import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextResponse } from "next/server";
import { GetPatientArrayResponseDto } from "@/lib/dtos/user/patient/response.dto";

export async function GET() {
    try {
        const getPatients = withAuth<any, GetPatientArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetPatientArrayResponseDto = await getPatients(endpoints.USER.PATIENT.EEQ.FIND_ALL, {});
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}