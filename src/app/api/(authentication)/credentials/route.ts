import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PATCHCredentialRequestDto, POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: POSTCredentialRequestDto = await req.json()
        const postCredential = withAuth<POSTCredentialRequestDto, any>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await postCredential(endpoints.AUTHENTICATION.CREDENTIAL.CREATE, { body: data, headers: CONTENT_TYPE_APPLICATION_JSON });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const data: PATCHCredentialRequestDto = await req.json()
        const pathCredential = withAuth<PATCHCredentialRequestDto, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const response = await pathCredential(endpoints.AUTHENTICATION.CREDENTIAL.UPDATE, { body: data, headers: CONTENT_TYPE_APPLICATION_JSON });
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}