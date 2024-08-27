import ApiClientError from "@/lib/api-client/base/api-error";
import omega from "@/lib/api-client/omega-client/omega";
import { GetSelectorOptionResponseDto } from "@/lib/dtos/selector/response.dto";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { options }: GetSelectorOptionResponseDto<number> = await omega().execute('selectorCorporativeGroup');
        return NextResponse.json(options, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}