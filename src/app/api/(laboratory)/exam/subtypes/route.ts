import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostExamSubtypeRequestDto } from "@/lib/dtos/laboratory/exam/subtype/request.dto";
import { GetExamSubtypeArrayResponseDto, PostExamSubtypeResponseDto } from "@/lib/dtos/laboratory/exam/subtype/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getExamSubtype = withAuth<any, GetExamSubtypeArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetExamSubtypeArrayResponseDto = await getExamSubtype(endpoints.LABORATORY.EXAM.TYPE.FIND_ALL, { cache: false });
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

export async function POST(req: NextRequest) {
    try {
        const data: PostExamSubtypeRequestDto = await req.json();
        const postExamSubtype = withAuth<PostExamSubtypeRequestDto, PostExamSubtypeResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const subtype: PostExamSubtypeResponseDto = await postExamSubtype(endpoints.LABORATORY.EXAM.SUBTYPE.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(subtype, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}