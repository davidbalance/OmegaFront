import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextResponse } from "next/server";
import { GETCorporativeGroupDto } from "@/lib/dtos/location/corporative/group.response.dto";

export async function GET() {
    try {
        const getCorporativeGroups = withAuth<any, GETCorporativeGroupDto>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { corporativeGroups }: GETCorporativeGroupDto = await getCorporativeGroups(endpoints.LOCATION.CORPORATIVE_GROUP.FIND_ALL, {});
        return NextResponse.json(corporativeGroups, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}