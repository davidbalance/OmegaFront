import { NextResponse } from "next/server";
import { GetPatientArrayResponseDto } from "@/lib/dtos/user/patient/response.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function GET() {
    try {
        const { data }: GetPatientArrayResponseDto = await omega().execute('patientDetails');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}