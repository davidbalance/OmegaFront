import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; id: string } }
) {
    try {
        const data = { ...params, id: parseInt(params.id) };
        console.log(1, data);
        const blob: Blob = await post(endpoints.FILE.RESULT.DONWLOAD_SINGLE_FILE, { type: 'blob', body: data, headers: { 'Accept': 'application/*' } });
        console.log(2);
        const headers = new Headers();
        console.log(3);
        headers.set("Content-Type", "application/pdf");
        console.log(4);
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}