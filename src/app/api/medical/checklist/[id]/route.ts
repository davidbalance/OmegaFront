import { NextRequest, NextResponse } from "next/server";
import { retriveMedicalChecklistFile } from "@/server/medical_order/actions";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(
    _: NextRequest,
    { params }: {
        params: { id: string; }
    }
) {
    try {
        const blob: Blob = await retriveMedicalChecklistFile(params.id);
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}