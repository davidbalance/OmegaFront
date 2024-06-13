import { GETWebResourcesResponseDto } from "@/lib/dtos/web/resources.response.dto";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getUsers = withAuth<any, GETWebResourcesResponseDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { resources }: GETWebResourcesResponseDto = await getUsers(endpoints.WEB.RESOURCE.FIND_ALL, {});
        return NextResponse.json(resources, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}