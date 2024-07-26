import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PATCHAreaRequestDto } from "@/lib/dtos/location/area/request.dto";
import { PATCHAreaResponseDto } from "@/lib/dtos/location/area/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PATCHAreaRequestDto = await req.json();
        const patchArea = withAuth<PATCHAreaRequestDto, PATCHAreaResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const area: PATCHAreaResponseDto = await patchArea(endpoints.LOCATION.AREA.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(area, { status: 200 });
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
        await deleteArea(endpoints.LOCATION.AREA.DELETE_ONE(params.id), {
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