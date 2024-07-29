import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTMedicalOrderMailRequestDto } from "@/lib/dtos/medical/order/request.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { order: number, mail: number } }
) {
    try {
        const body: POSTMedicalOrderMailRequestDto = { order: parseInt(`${params.order}`), mail: parseInt(`${params.mail}`) };
        const postMailer = withAuth<POSTMedicalOrderMailRequestDto, any>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await postMailer(endpoints.MEDICAL.ORDER.MAIL, {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}