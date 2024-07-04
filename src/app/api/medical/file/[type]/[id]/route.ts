import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; id: string } }
) {
    try {
        const data = { ...params, id: parseInt(params.id) };
        const blob: Blob = await post(endpoints.FILE.RESULT.DOWNLOAD_SINGLE_FILE, {
            type: 'blob',
            body: data,
            headers: { 'Accept': 'application/*', ...CONTENT_TYPE_APPLICATION_JSON }
        });
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
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
    { params }: { params: { type: string; id: string } }
) {
    try {
        const deleteFile = withAuth(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteFile(endpoints.FILE.RESULT.DELETE_FILE(params.type, params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}