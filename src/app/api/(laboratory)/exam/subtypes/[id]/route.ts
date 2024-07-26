import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostExamSubtypeRequestDto } from "@/lib/dtos/laboratory/exam/subtype/request.dto";
import { PostExamSubtypeResponseDto } from "@/lib/dtos/laboratory/exam/subtype/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PostExamSubtypeRequestDto = await req.json();
        const patchSubtype = withAuth<PostExamSubtypeRequestDto, PostExamSubtypeResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const subtype: PostExamSubtypeResponseDto = await patchSubtype(endpoints.LABORATORY.EXAM.TYPE.UPDATE_ONE(params.id), {
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

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const deleteSubtype = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteSubtype(endpoints.LABORATORY.EXAM.TYPE.DELETE_ONE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}