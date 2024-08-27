import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PatchUserAttributeRequestDto } from "@/lib/dtos/user/user/attribute/request.dto";
import { GetUserAttributeResponseDto } from "@/lib/dtos/user/user/attribute/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const attribute: GetUserAttributeResponseDto = await omega().addParams({ id: params.id }).execute('userAttributeDoctorOfDetails')
        return NextResponse.json(attribute, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchUserAttributeRequestDto = await req.json();
        await omega().addParams({ id: params.id }).addBody(data).execute('userAttributeDoctorOfUpdate');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}