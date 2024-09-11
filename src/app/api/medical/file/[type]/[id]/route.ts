import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; id: string } }
) {
    try {
        const data = { ...params, id: parseInt(params.id) };
        const blob: Blob = await omega()
            .addBody(data)
            .execute('medicalFileSingle');
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}