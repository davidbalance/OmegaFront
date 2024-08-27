import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { GETLogsLevel } from "@/lib/dtos/logs/log.response.dto";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { levels }: GETLogsLevel = await omega().execute('logLevel');
        return NextResponse.json(levels, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}