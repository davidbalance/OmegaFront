import { PATCHMedicalEmailResponseDto } from "@/lib/dtos/medical/client/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    _: NextRequest,
    { params }: { params: { dni: string, id: number } }
) {
    try {
        const postClientMail = withAuth<any, PATCHMedicalEmailResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const { email }: PATCHMedicalEmailResponseDto = await postClientMail(endpoints.MEDICAL.CLIENT.SET_CLIENT_MAIL_DEFAULT(params.dni, params.id), {});
        return NextResponse.json(email, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}