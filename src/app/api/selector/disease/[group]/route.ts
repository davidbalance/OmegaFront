import { NextRequest, NextResponse } from "next/server";
import { GetSelectorOptionResponseDto } from "@/lib/dtos/selector/response.dto";
import omega from "@/lib/api-client/omega-client/omega";
import ApiClientError from "@/lib/api-client/base/api-error";

export async function GET(
    _: NextRequest,
    { params }: { params: { group: number } }
) {
    try {
        const { options }: GetSelectorOptionResponseDto<number> = await omega().addParams({ group: params.group }).execute('selectorDisease');
        return NextResponse.json(options, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof ApiClientError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}