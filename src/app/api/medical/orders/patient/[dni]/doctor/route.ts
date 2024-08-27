import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { GetMedicalOrderArrayResponseDto } from "@/lib/dtos/medical/order/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }) {
    try {
        const { data }: GetMedicalOrderArrayResponseDto = await omega().addParams({ dni: params.dni }).execute('medicalOrderDetailsByPatientAndDoctor');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}