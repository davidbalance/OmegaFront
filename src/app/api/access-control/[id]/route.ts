import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { FindAndUpdateACRolesRQ, FindOneACClientRS } from "@/services/api/access-control/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const getAccessClient = withAuth<any, FindOneACClientRS>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const client: FindOneACClientRS = await getAccessClient(endpoints.ACCESS_CONTROL.V1.FIND_ONE(params.id), {});
        return NextResponse.json(client, { status: 200 });
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
        const data: FindAndUpdateACRolesRQ = await req.json();
        const patchAccessControl = withAuth<FindAndUpdateACRolesRQ, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchAccessControl(endpoints.ACCESS_CONTROL.V1.FIND_ONE_AND_UPDATE_ROLES(`${params.id}`), { body: data });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}