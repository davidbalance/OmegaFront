import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { POSTLogRequestDto } from "@/lib/dtos/logs/log.request.dto";
import { GETLogs } from "@/lib/dtos/logs/log.response.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data: POSTLogRequestDto = await req.json();
        const { logs }: GETLogs = await omega().addBody(data).execute('logDetails');
        return NextResponse.json(logs, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}