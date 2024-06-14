import { PATCHCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

}

export async function PATCH(req: NextRequest) {
    try {
        const data: PATCHCredentialRequestDto = await req.json()
        const pathCredential = withAuth<PATCHCredentialRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const response = await pathCredential(endpoints.AUTHENTICATION.CREDENTIAL.UPDATE, { body: data });
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}