import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { PatchDiseaseGroupRequestDto } from "@/lib/dtos/disease/group/request.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchDiseaseGroupRequestDto = await req.json()
        const patchDiseaseGroup = withAuth<PatchDiseaseGroupRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchDiseaseGroup(endpoints.DISEASE.GROUP.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
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
        const deleteDiseaseGroup = withAuth(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteDiseaseGroup(endpoints.DISEASE.GROUP.DELETE_ONE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}