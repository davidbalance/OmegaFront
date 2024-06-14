import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextResponse } from "next/server";
import { GETPatientsResponseDto } from "@/lib/dtos/user/patient.response.dto";

export async function GET() {
    try {
        const getPatients = withAuth<any, GETPatientsResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { patients }: GETPatientsResponseDto = await getPatients(endpoints.USER.PATIENT.FIND_ALL, {});
        return NextResponse.json(patients, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}