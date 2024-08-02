import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchOmegaWebResourceRequestDto } from "@/lib/dtos/omega/web/resource/request.dto";
import { PatchOmegaWebResourceResponseDto } from "@/lib/dtos/omega/web/resource/response.dto";
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
        const body: PatchOmegaWebResourceRequestDto = await req.json();
        const patchResource = withAuth<PatchOmegaWebResourceRequestDto, PatchOmegaWebResourceResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const resource: PatchOmegaWebResourceResponseDto = await patchResource(endpoints.OMEGA.WEB.RESOURCE.UPDATE_ONE(params.id), {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(resource, { status: 200 });
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
        const deleteResource = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteResource(endpoints.OMEGA.WEB.RESOURCE.DELETE_ONE(params.id), {});
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