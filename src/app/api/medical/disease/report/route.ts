import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/utils/errors";
import { serverActionRetriveMedicalDiseaseReportFile } from "@/server/medical-test/actions";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const blob: Blob = await serverActionRetriveMedicalDiseaseReportFile(data);
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}