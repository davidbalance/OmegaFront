import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { code: string; } }
) {
    try {
        const session = await auth();
        const blob: Blob = await omega()
            .addParams({ code: params.code })
            .addHeader({ 'accept': 'application/*' })
            .addToken(session.access_token)
            .execute('medicalFileTreeBlob');
        const headers = new Headers();
        headers.set('Content-Type', 'application/zip');
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}