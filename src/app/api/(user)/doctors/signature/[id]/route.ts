'use server'

import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const body = await req.formData();
        const postFile = withAuth<any, any>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await postFile(endpoints.USER.DOCTOR.FIND_ONE_AND_UPLOAD_IMAGE(params.id), {
            application: 'form',
            body: body
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}