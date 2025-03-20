import { getErrorMessage } from "@/lib/utils/errors";
import { retriveClientMassiveLoadTemplate } from "@/server/medical_client/actions";
import { retriveMedicalOrderMassiveLoadTemplate } from "@/server/medical_order/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; } }
) {
    try {
        let blob: Blob;
        if (params.type === 'patient') {
            blob = await retriveClientMassiveLoadTemplate();
        } else {
            blob = await retriveMedicalOrderMassiveLoadTemplate();
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}