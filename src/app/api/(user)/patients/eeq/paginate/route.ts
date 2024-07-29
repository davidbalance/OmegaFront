import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostPatientEeqPaginationRequestDto } from "@/lib/dtos/user/patient/request.dto";
import { PostPatientEeqPaginationResponseDto } from "@/lib/dtos/user/patient/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const data: PostPatientEeqPaginationRequestDto = await req.json();
        const postPatient = withAuth<any, PostPatientEeqPaginationResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const patients: PostPatientEeqPaginationResponseDto = await postPatient(endpoints.USER.PATIENT.EEQ.FIND_WITH_PAGINATION, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(patients, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}