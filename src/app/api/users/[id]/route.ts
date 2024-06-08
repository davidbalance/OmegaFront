import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { UpdateUserRS, User } from "@/services/api/user/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: UpdateUserRS = await req.json()
        const patchUser = withAuth<UpdateUserRS, User>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const user = await patchUser(endpoints.USER.V1.FIND_ONE_AND_UPDATE(`${params.id}`), { body: data });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}