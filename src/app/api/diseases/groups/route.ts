import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { GETDiseaseGroupsResponseDto, POSTDiseaseGroupResponseDto } from "@/lib/dtos/disease/group/response.dto";
import { POSTDiseaseGroupRequestDto } from "@/lib/dtos/disease/group/request.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";

export async function GET() {
    try {
        const getDiseaseGroup = withAuth<any, GETDiseaseGroupsResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { groups }: GETDiseaseGroupsResponseDto = await getDiseaseGroup(endpoints.DISEASE.GROUP.FIND, {});
        return NextResponse.json(groups, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const data: POSTDiseaseGroupRequestDto = await req.json();
        const postDiseaseGroup = withAuth(post, DEFAULT_WITH_AUTH_OPTIONS);
        const group: POSTDiseaseGroupResponseDto = await postDiseaseGroup<POSTDiseaseGroupRequestDto, POSTDiseaseGroupResponseDto>(endpoints.DISEASE.GROUP.CREATE, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(group, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}