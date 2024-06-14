import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { POSTDiseaseRequestDto } from "@/lib/dtos/disease/request.dto";
import { POSTDiseaseResponseDto } from "@/lib/dtos/disease/response.dto";

export async function POST(req: NextRequest) {
    try {
        const data: POSTDiseaseRequestDto = await req.json();
        const postDisease = withAuth<POSTDiseaseRequestDto, POSTDiseaseResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const newDisease = await postDisease(endpoints.DISEASE.DISEASE.CREATE, { body: data });
        return NextResponse.json(newDisease, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}