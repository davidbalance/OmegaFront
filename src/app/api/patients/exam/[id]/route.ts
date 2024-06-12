import { FetchError } from "@/lib/errors/fetch.error";
import { patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { FindAndUpdateACRolesRQ } from "@/services/api/access-control/dtos";
import { UpdateMedicalResultRQ } from "@/services/api/medical-result/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: UpdateMedicalResultRQ = await req.json();
        const patchExamResult = withAuth<UpdateMedicalResultRQ, any>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchExamResult(endpoints.MEDICAL_RESULT.V1.FIND_ONE_AND_UPDATE_DISEASE(`${params.id}`), { body: data });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}