'use server'

import auth from "@/lib/auth/auth";
import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    try {
        const blob: Blob = await omega()
            .addToken(session.access_token)
            .execute('medicalResultFileCheckReport');
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}