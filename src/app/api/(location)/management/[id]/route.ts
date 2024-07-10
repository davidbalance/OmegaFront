import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PATCHManagementRequestDto } from "@/lib/dtos/location/management/request.dto";
import { PATCHManagementResponseDto } from "@/lib/dtos/location/management/response.dto";
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
        const data: PATCHManagementRequestDto = await req.json();
        const patchManagement = withAuth<PATCHManagementRequestDto, PATCHManagementResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const management: PATCHManagementResponseDto = await patchManagement(endpoints.LOCATION.MANAGEMENT.FIND_ONE_AND_UPDATE(params.id), {
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
        await deleteArea(endpoints.LOCATION.MANAGEMENT.FIND_ONE_AND_DELETE(params.id), {
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