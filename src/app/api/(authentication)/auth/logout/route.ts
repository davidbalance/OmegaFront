import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS, removeAuth } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        removeAuth();
        const logout = withAuth<any, any>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await logout(endpoints.AUTHENTICATION.AUTH.LOGOUT, {});
        return NextResponse.json('Logged out', { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json(error.data, { status: error.response.status });
        }
        return NextResponse.json(error, { status: 500 });
    }
}