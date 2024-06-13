import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { CreateDiseaseRQ, CreateDiseaseRS } from "@/services/api/disease/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: CreateDiseaseRQ = await req.json();
        const postDisease = withAuth<CreateDiseaseRQ, CreateDiseaseRS>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const newDisease = await postDisease(endpoints.DISEASE.V1.CREATE, { body: data });
        return NextResponse.json(newDisease, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}