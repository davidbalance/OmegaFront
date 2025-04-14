import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/utils/errors";
import { serverActionRetriveMedicalChecklistFile } from "@/server/medical-order/actions";

export async function GET(
    _: NextRequest,
    { params }: {
        params: { id: string; }
    }
) {
    try {
        const blob: Blob = await serverActionRetriveMedicalChecklistFile(params.id);
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}