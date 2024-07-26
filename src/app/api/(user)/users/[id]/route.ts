import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchUserRequestDto } from "@/lib/dtos/user/user/request.dto";
import { PatchUserResponseDto } from "@/lib/dtos/user/user/response.dto";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchUserRequestDto = await req.json()
        const patchUser = withAuth<PatchUserRequestDto, PatchUserResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const user = await patchUser(endpoints.USER.USER.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(user, { status: 200 });
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
        const deleteUser = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteUser(endpoints.USER.USER.DELETE_ONE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}