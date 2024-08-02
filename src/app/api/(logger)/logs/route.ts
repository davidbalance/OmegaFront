import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";
import { POSTLogRequestDto } from "@/lib/dtos/logs/log.request.dto";
import { GETLogs } from "@/lib/dtos/logs/log.response.dto";
import endpoints from "@/lib/endpoints/endpoints";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: POSTLogRequestDto = await req.json();
        const postLogs = withAuth<any, GETLogs>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const { logs }: GETLogs = await postLogs(endpoints.LOGGER.FIND_ALL, {
            body: data,
            headers: CONTENT_TYPE_APPLICATION_JSON
        });
        return NextResponse.json(logs, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}