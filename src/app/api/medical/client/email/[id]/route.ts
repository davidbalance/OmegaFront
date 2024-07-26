import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { PostMedicalClientEmailRequestDto } from "@/lib/dtos/medical/client/email/request.dto";
import { PatchMedicalClientEmailResponseDto, PostMedicalClientEmailResponseDto } from "@/lib/dtos/medical/client/email/response.dto";
import { GetMedicalClientArrayResponseDto } from "@/lib/dtos/medical/client/response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { del, get, patch, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const getClientMail = withAuth<any, GetMedicalClientArrayResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { data }: GetMedicalClientArrayResponseDto = await getClientMail(endpoints.MEDICAL.CLIENT.EMAIL.FIND_ALL(params.id), { cache: false });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body: PostMedicalClientEmailRequestDto = await req.json();
        const postClientMail = withAuth<PostMedicalClientEmailRequestDto, PostMedicalClientEmailResponseDto>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const data: PostMedicalClientEmailResponseDto = await postClientMail(endpoints.MEDICAL.CLIENT.EMAIL.CREATE(params.id), {
            body: body,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        console.log(data);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function PATCH(
    _: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const postClientMail = withAuth<any, PatchMedicalClientEmailResponseDto>(patch, DEFAULT_WITH_AUTH_OPTIONS);
        const data: PatchMedicalClientEmailResponseDto = await postClientMail(endpoints.MEDICAL.CLIENT.EMAIL.UPDATE_ONE(params.id), {});
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
    { params }: { params: { id: number } }
) {
    try {
        const postClientMail = withAuth<any, any>(del, DEFAULT_WITH_AUTH_OPTIONS);
        await postClientMail(endpoints.MEDICAL.CLIENT.EMAIL.DELETE_ONE(params.id), {});
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}