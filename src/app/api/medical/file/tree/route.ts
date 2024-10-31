import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log(1)
        const session = await auth();
        console.log(2)
        const data = await req.json();
        console.log(3)
        const blob: Blob = await omega()
            .addQuery({ ...data })
            .addHeader({ 'accept': 'application/*' })
            .addToken(session.access_token)
            .execute('medicalFileTree');
        console.log(4)
        const headers = new Headers();
        console.log(5)
        headers.set('Content-Type', 'application/zip');
        console.log(6)
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}