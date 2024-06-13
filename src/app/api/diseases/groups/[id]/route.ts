import { FetchError } from "@/lib/errors/fetch.error";
import { del, patch } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { UpdateDiseaseGroupRQ, UpdateDiseaseGroupRS } from "@/services/api/disease-group/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const data: UpdateDiseaseGroupRQ = await req.json()
        const patchDiseaseGroup = withAuth<UpdateDiseaseGroupRQ, UpdateDiseaseGroupRS>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const group = await patchDiseaseGroup(endpoints.DISEASE_GROUP.V1.FIND_ONE_AND_UPDATE(`${params.id}`), { body: data });
        return NextResponse.json(group, { status: 200 });
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
        const deleteDiseaseGroup = withAuth(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteDiseaseGroup(endpoints.DISEASE_GROUP.V1.FIND_ONE_AND_DELETE(`${params.id}`), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}