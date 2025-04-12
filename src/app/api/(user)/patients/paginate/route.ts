import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostPatientPaginationRequestDto } from "@/lib/dtos/user/patient/request.dto";
import { PostPatientPaginationResponseDto } from "@/lib/dtos/user/patient/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const data: PostPatientPaginationRequestDto = await req.json();
        const postPatient = withAuth<any, PostPatientPaginationResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const patients: PostPatientPaginationResponseDto = await postPatient(endpoints.USER.PATIENT.FIND_WITH_PAGINATION, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(patients, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}