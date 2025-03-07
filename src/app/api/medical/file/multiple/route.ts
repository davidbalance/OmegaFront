import { getErrorMessage } from "@/lib/utils/errors";
import { retriveMedicalTestZip } from "@/server/medical_test/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const blob: Blob = await retriveMedicalTestZip(data);
        const headers = new Headers();
        headers.set("Content-Type", "application/zip");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}