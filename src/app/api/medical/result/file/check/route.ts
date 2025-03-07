'use server'

import { NextResponse } from "next/server";
import { retriveMedicalTestFileReport } from "@/server/medical_test/actions";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET() {
    try {
        const blob: Blob = await retriveMedicalTestFileReport();
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return new NextResponse(blob, { status: 200, headers });
    } catch (error) {
        console.error(getErrorMessage(error));
        return NextResponse.json({ message: getErrorMessage(error) }, { status: 404 });
    }
}