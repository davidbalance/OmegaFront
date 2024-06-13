import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { UpdateDiseaseRQ } from "@/services/api/disease/dtos";
import { UpdateUserRS } from "@/services/api/user/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: UpdateDiseaseRQ = await req.json()
        const patchDisease = withAuth<UpdateDiseaseRQ, UpdateUserRS>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const disease = await patchDisease(endpoints.DISEASE.V1.FIND_ONE_AND_UPDATE(`${params.id}`), { body: data });
        return NextResponse.json(disease, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const deleteDisease = withAuth(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteDisease(endpoints.DISEASE.V1.FIND_ONE_AND_DELETE(`${params.id}`), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}