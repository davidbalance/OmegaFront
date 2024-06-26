import { GETLogs, GETLogsLevel } from "@/lib/dtos/logs/log.response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { get } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getLevel = withAuth<any, GETLogsLevel>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const { levels }: GETLogsLevel = await getLevel(endpoints.LOGGER.FIND_LEVEL, {});
        return NextResponse.json(levels, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}