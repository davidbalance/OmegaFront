import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const blob: Blob = await post(endpoints.FILE.RESULT.DONWLOAD_MULTIPLE_FILE, {
            type: 'blob',
            body: data,
            headers: {
                'Accept': 'application/*', ...CONTENT_TYPE_APPLICATION_JSON
            }
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