import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const body = await req.formData();
        const patchFile = withAuth<any, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchFile(endpoints.MEDICAL.REPORT.UPLOAD_FILE(params.id), {
            application: 'form',
            body: body
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}