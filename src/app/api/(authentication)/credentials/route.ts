import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PATCHCredentialRequestDto, POSTCredentialRequestDto } from "@/lib/dtos/auth/credential/request.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: POSTCredentialRequestDto = await req.json();
        await omega().addBody(data).execute('credentialCreate');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const data: PATCHCredentialRequestDto = await req.json();
        const response = await omega().addBody(data).execute('passwordUpdate');
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}