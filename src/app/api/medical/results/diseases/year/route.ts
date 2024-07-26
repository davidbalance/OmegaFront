import { GetMedicalResultDiseaseYearArrayResponseDto } from "@/lib/dtos/medical/result/disease/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getYear = withAuth<any, GetMedicalResultDiseaseYearArrayResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetMedicalResultDiseaseYearArrayResponseDto = await getYear(endpoints.MEDICAL.RESULT.DISEASE.YEAR, {});
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