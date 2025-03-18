import { getErrorMessage } from "@/lib/utils/errors";
import { retriveMedicalReportFile, retriveMedicalResultFile } from "@/server/medical_test/actions";
import { retriveClientRecordFile } from "@/server/record/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; id: string } }
) {
    try {
        const data = { ...params, id: params.id };
        let blob: Blob;
        if (data.type === 'result') {
            blob = await retriveMedicalResultFile(params.id);
        } else if (data.type === 'result') {
            blob = await retriveMedicalReportFile(params.id)
        } else {
            blob = await retriveClientRecordFile(params.id)
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}