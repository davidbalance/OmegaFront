import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { PATCHUserResponseDto } from "@/lib/dtos/user/user.response.dto";
import { PATCHUserRequestDto } from "@/lib/dtos/user/user.request.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PATCHUserRequestDto = await req.json()
        const patchUser = withAuth<PATCHUserRequestDto, PATCHUserResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const user = await patchUser(endpoints.USER.USER.FIND_ONE_AND_UPDATE(params.id), {
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
        await deleteUser(endpoints.USER.USER.FIND_ONE_AND_DELETE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}