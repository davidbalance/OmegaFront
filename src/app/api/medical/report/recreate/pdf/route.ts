import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await omega().execute('medicalReportRecreateAll');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest
) {
    try {
        const { dni }: { dni: string } = await req.json();
        await omega().addParams({ dni: dni }).execute('medicalReportRecreateByPatient');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}