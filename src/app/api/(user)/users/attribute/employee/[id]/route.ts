import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PatchUserAttributeRequestDto } from "@/lib/dtos/user/user/attribute/request.dto";
import { GetUserAttributeResponseDto } from "@/lib/dtos/user/user/attribute/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const getAttribute = withAuth<any, any>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const attribute: GetUserAttributeResponseDto = await getAttribute(endpoints.USER.USER.ATTRIBUTES.EMPLOYEE.FIND(params.id), {
            cacheExpirationSeconds: 30,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(attribute, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            if (error.response.status !== 404) {
                return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
            } else {
                return NextResponse.json({}, { status: 200 });
            }
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchUserAttributeRequestDto = await req.json();
        const patchAttribute = withAuth<any, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchAttribute(endpoints.USER.USER.ATTRIBUTES.EMPLOYEE.UPDATE_ONE(params.id), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
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