import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTMedicalClientManagementAndAreaRequestDto } from "@/lib/dtos/medical/client/request.dto";
import { GETMedicalClientManagementAndAreaResponseDto } from "@/lib/dtos/medical/client/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, get, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { dni: string } }
) {
    try {
        const { dni } = params;
        const url = endpoints.MEDICAL.CLIENT.FIND_CLIENT_BY_DNI_GET_MANAGEMENT_AREA(dni);
        const getManagementArea = withAuth<any, GETMedicalClientManagementAndAreaResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GETMedicalClientManagementAndAreaResponseDto = await getManagementArea(url, {});
        return NextResponse.json(data, { status: 200 });
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
        const body: POSTMedicalClientManagementAndAreaRequestDto = await req.json();
        const { dni } = params;
        const url = endpoints.MEDICAL.CLIENT.FIND_CLIENT_BY_DNI_POST_MANAGEMENT_AREA(dni);
        const postManagementArea = withAuth<POSTMedicalClientManagementAndAreaRequestDto, GETMedicalClientManagementAndAreaResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GETMedicalClientManagementAndAreaResponseDto = await postManagementArea(url, {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(data, { status: 200 });
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
    { params }: { params: { dni: string } }
) {
    try {
        const { dni } = params;
        const url = endpoints.MEDICAL.CLIENT.FIND_CLIENT_BY_DNI_DELETE_MANAGEMENT_AREA(dni);
        const deleteManagementArea = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await deleteManagementArea(url, {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}