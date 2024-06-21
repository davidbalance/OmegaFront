import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTMedicalEmailRequestDto } from "@/lib/dtos/medical/client/request.dto";
import { GETMedicalEmailArrayResponseDto, POSTMedicalEmailResponseDto } from "@/lib/dtos/medical/client/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const getClientMail = withAuth<any, GETMedicalEmailArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { email }: GETMedicalEmailArrayResponseDto = await getClientMail(endpoints.MEDICAL.CLIENT.FIND_CLIENT_EMAIL(params.dni), {});
        return NextResponse.json(email, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const data: POSTMedicalEmailRequestDto = await req.json();
        const postClientMail = withAuth<POSTMedicalEmailRequestDto, POSTMedicalEmailResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const { email }: POSTMedicalEmailResponseDto = await postClientMail(endpoints.MEDICAL.CLIENT.CREATE_CLIENT_EMAIL(params.dni), {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(email, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}