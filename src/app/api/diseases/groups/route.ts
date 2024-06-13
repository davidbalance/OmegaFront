import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { CreateDiseaseGroupRQ } from "@/services/api/disease-group/dtos";
import { DiseaseDiseaseGroup, FindDiseaseGroups } from "@/services/api/disease/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getUsers = withAuth<any, FindDiseaseGroups>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { groups }: FindDiseaseGroups = await getUsers(endpoints.DISEASE_GROUP.V1.FIND, {});
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
        const data: CreateDiseaseGroupRQ = await req.json();
        const postDiseaseGroup = withAuth(post, DEFAULT_WITH_AUTH_OPTIONS);
        const group: DiseaseDiseaseGroup = await postDiseaseGroup<CreateDiseaseGroupRQ, DiseaseDiseaseGroup>(endpoints.DISEASE_GROUP.V1.CREATE, { body: data });
        return NextResponse.json(group, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}