import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { FindCredentialAndUpdateRQ } from "@/services/api/user-credential/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest
) {
    try {
        const data: FindCredentialAndUpdateRQ = await req.json()
        const pathCredential = withAuth<FindCredentialAndUpdateRQ, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const response = await pathCredential(endpoints.CREDENTIAL.V1.FIND_ONE_AND_UPDATE_PASSWORD, { body: data });
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}