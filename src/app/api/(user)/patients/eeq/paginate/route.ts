import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostPatientEeqPaginationRequestDto } from "@/lib/dtos/user/patient/request.dto";
import { PostPatientEeqPaginationResponseDto } from "@/lib/dtos/user/patient/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const data: PostPatientEeqPaginationRequestDto = await req.json();
        const patients: PostPatientEeqPaginationResponseDto = await omega().addBody(data).execute('patientEeqDetailsPagination');
        return NextResponse.json(patients, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}