import { NextRequest, NextResponse } from "next/server";
import { POSTLoginRequestDto } from "@/lib/dtos/auth/request.dto";
import { GetUserResponseDto } from "@/lib/dtos/user/user/response.dto";
import { GetOmegaWebClientResponseDto } from "@/lib/dtos/omega/web/client/response.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function POST(req: NextRequest) {
    try {
        const credential: POSTLoginRequestDto = await req.json();
        await omega().addBody(credential).authenticate();
        const preferences: GetOmegaWebClientResponseDto = await omega().execute('webClientDetails')
        const user: GetUserResponseDto = await omega().execute('accountDetail');

        return NextResponse.json({ ...preferences, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}