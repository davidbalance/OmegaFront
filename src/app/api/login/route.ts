'use server'

import { LOGO_KEY, RESOURCE_KEY, USER_KEY } from "@/lib/constants";
import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, DEFAULT_WITH_LOGIN_OPTIONS, withAuth, withLogin } from "@/lib/fetcher/with-fetch.utils";
import { UserPreferenceData, UserPreferences } from "@/lib/types/user-preferences.type";
import { AuthCredentials } from "@/services/api/authentication/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const credential: AuthCredentials = await req.json();
        const login = withLogin(post, DEFAULT_WITH_LOGIN_OPTIONS);
        await login(endpoints.AUTHENTICATION.V1.LOGIN, { body: credential });
        const getPreferences = withAuth<any, Omit<UserPreferences, 'user'>>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const preferences = await getPreferences(endpoints.OMEGA_WEB_CLIENT.V1.FIND_ONE, {});
        
        const getUser = withAuth<any, UserPreferenceData>(get, DEFAULT_WITH_LOGIN_OPTIONS);
        const user = await getUser(endpoints.USER.V1.FIND_ONE, {});

        return NextResponse.json({ ...preferences, user }, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}