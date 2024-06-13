import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { FindRolesRS } from "@/services/api/role/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getRoles = withAuth<any, FindRolesRS>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { roles }: FindRolesRS = await getRoles(endpoints.ROLE.V1.FIND, {});
        return NextResponse.json(roles, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}