import { getErrorMessage } from "@/lib/utils/errors";
import { serverActionRetriveClientMassiveLoadTemplate } from "@/server/medical-client/actions";
import { serverActionRetriveMedicalOrderMassiveLoadTemplate } from "@/server/medical-order/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { type: string; } }
) {
    try {
        let blob: Blob;
        if (params.type === 'patient') {
            blob = await serverActionRetriveClientMassiveLoadTemplate();
        } else {
            blob = await serverActionRetriveMedicalOrderMassiveLoadTemplate();
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}