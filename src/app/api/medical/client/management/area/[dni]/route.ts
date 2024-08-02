import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostMedicalClientEmailResponseDto } from "@/lib/dtos/medical/client/email/response.dto";
import { PostMedicalClientManagementRequest } from "@/lib/dtos/medical/client/management/base.request.dto";
import { GetMedicalClientManagementResponseDto } from "@/lib/dtos/medical/client/management/response.dto";
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
        const url = endpoints.MEDICAL.CLIENT.MANAGEMENT.FIND_ONE(dni);
        const getManagementArea = withAuth<any, GetMedicalClientManagementResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const data: GetMedicalClientManagementResponseDto = await getManagementArea(url, {});
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
        const body: PostMedicalClientManagementRequest = await req.json();
        const { dni } = params;
        const url = endpoints.MEDICAL.CLIENT.MANAGEMENT.CREATE(dni);
        const postManagementArea = withAuth<PostMedicalClientManagementRequest, PostMedicalClientEmailResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const data: PostMedicalClientEmailResponseDto = await postManagementArea(url, {
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
        const url = endpoints.MEDICAL.CLIENT.MANAGEMENT.DELETE_ONE(dni);
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