import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; id: string } }
) {
    try {
        const data = { ...params, id: parseInt(params.id) };
        const blob: Blob = await post(endpoints.ORDER.V1.DOWNLOAD_SINGLE_FILE, { type: 'blob', body: data, headers: { 'Accept': 'application/*' } });
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