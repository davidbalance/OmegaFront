import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { POSTMedicalOrderMailRequestDto } from "@/lib/dtos/medical/order/request.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { order: number, mail: number } }
) {
    try {
        const body: POSTMedicalOrderMailRequestDto = { order: parseInt(`${params.order}`), mail: parseInt(`${params.mail}`) };
        await omega().addBody(body).execute('medicalOrderMail');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}