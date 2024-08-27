import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { PatchDiseaseGroupRequestDto } from "@/lib/dtos/disease/group/request.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: PatchDiseaseGroupRequestDto = await req.json();
        await omega().addParams({ id: params.id }).addBody(data).execute('diseaseGroupUpdate');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        await omega().addParams({ id: params.id }).execute('diseaseGroupDelete');
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}