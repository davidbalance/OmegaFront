import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const recreateReport = withAuth<any, any>(get, DEFAULT_WITH_AUTH_OPTIONS);
        await recreateReport(endpoints.MEDICAL.REPORT.RECREATE_ALL_PDF, {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function POST(
    req: NextRequest
) {
    try {
        const { dni }: { dni: string } = await req.json();
        const recreateReport = withAuth<any, any>(get, DEFAULT_WITH_AUTH_OPTIONS);
        await recreateReport(endpoints.MEDICAL.REPORT.RECREATE_ALL_PDF_BY_DNI(dni), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}