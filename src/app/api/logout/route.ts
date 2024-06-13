'use server'

import { AUTH_TOKEN_COOKIE, LOGO_KEY, REFRESH_TOKEN_COOKIE, RESOURCE_KEY, USER_KEY } from "@/lib/constants";
import { FetchError } from "@/lib/errors/fetch.error";
import { post } from "@/lib/fetcher/fetcher";
import { withAuth, DEFAULT_WITH_AUTH_OPTIONS } from "@/lib/fetcher/with-fetch.utils";
import { UserPreferences } from "@/lib/types/user-preferences.type";
import endpoints from "@/lib/endpoints/endpoints";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieManager = cookies();
    try {
        const logout = withAuth<any, UserPreferences>(post, DEFAULT_WITH_AUTH_OPTIONS);
        await logout(endpoints.AUTHENTICATION.V1.LOGOUT, {});
        cookieManager.delete(AUTH_TOKEN_COOKIE);
        cookieManager.delete(REFRESH_TOKEN_COOKIE);
        return NextResponse.json('Logged out', { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json(error.data, { status: error.response.status });
        }
        return NextResponse.json(error, { status: 500 });
    }
}