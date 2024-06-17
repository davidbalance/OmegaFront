import { PATCHUserAttributeRequestDto } from "@/lib/dtos/user/user.request.dto";
import { GETUserAttributeRequestDto } from "@/lib/dtos/user/user.response.dto";
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
        const attribute: GETUserAttributeRequestDto = await getAttribute(endpoints.USER.USER.ATTRIBUTES.LOOK_FOR.FIND(params.id), { cacheExpirationSeconds: 30 });
        return NextResponse.json(attribute, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
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
        const data: PATCHUserAttributeRequestDto = await req.json();
        const patchAttribute = withAuth<any, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchAttribute(endpoints.USER.USER.ATTRIBUTES.LOOK_FOR.FIND_ONE_AND_UPDATE(params.id), { body: data });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}