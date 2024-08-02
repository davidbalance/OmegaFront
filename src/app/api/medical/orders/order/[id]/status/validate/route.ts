import { GetMedicalResultResponseDto } from "@/lib/dtos/medical/result/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const getMedicalResult = withAuth<any, GetMedicalResultResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GetMedicalResultResponseDto = await getMedicalResult(endpoints.MEDICAL.RESULT.FIND_ONE(params.id), {});
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}