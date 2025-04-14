import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/utils/errors";
import { serverActionRetriveMedicalTestFileReport } from "@/server/medical-test/actions";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const blob: Blob = await serverActionRetriveMedicalTestFileReport();
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}