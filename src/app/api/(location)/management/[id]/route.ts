import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchManagementRequestDto } from "@/lib/dtos/location/management/request.dto";
import { PatchManagementResponseDto } from "@/lib/dtos/location/management/response.dto";
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
        const data: PatchManagementRequestDto = await req.json();
        const patchManagement = withAuth<PatchManagementRequestDto, PatchManagementResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const management: PatchManagementResponseDto = await patchManagement(endpoints.LOCATION.MANAGEMENT.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(management, { status: 200 });
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
        const deleteArea = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteArea(endpoints.LOCATION.MANAGEMENT.DELETE_ONE(params.id), {
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