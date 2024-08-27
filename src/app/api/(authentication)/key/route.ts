import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { PostApiKeyRequestDto } from "@/lib/dtos/auth/api/key/request.dto";
import { GetApiKeyArrayResponseDto, PostApiKeyResponseDto } from "@/lib/dtos/auth/api/key/response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { data }: GetApiKeyArrayResponseDto = await omega().execute('apikeyDetails');
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest
) {
    try {
        const data: PostApiKeyRequestDto = await req.json();
        const apikey: PostApiKeyResponseDto = await omega().addBody(data).execute('apikeyCreate');
        return NextResponse.json(apikey, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}