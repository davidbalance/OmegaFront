import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostMedicalResultDiseaseRequestDto } from "@/lib/dtos/medical/result/disease/request.dto";
import { GetMedicalResultDiseaseArrayResponseDto, PostMedicalResultDiseaseResponseDto } from "@/lib/dtos/medical/result/disease/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: PostMedicalResultDiseaseRequestDto = await req.json();
        const postDisease = withAuth<PostMedicalResultDiseaseRequestDto, PostMedicalResultDiseaseResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const disease = await postDisease(endpoints.MEDICAL.RESULT.DISEASE.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(disease, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function GET() {
    try {
        const getDisease = withAuth<any, GetMedicalResultDiseaseArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetMedicalResultDiseaseArrayResponseDto = await getDisease(endpoints.MEDICAL.RESULT.DISEASE.FIND_ALL, {});
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