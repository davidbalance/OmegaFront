'use server'

import { FetchError } from "@/lib/errors/fetch.error";
import { get, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, DEFAULT_WITH_LOGIN_OPTIONS, withAuth, withLogin } from "@/lib/fetcher/with-fetch.utils";
import endpoints from "@/lib/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { POSTLoginRequestDto } from "@/lib/dtos/auth/request.dto";
import { POSTLoginResponseDto } from "@/lib/dtos/auth/response.dto";
import { GETUserResponseDto } from "@/lib/dtos/user/user.response.dto";
import { GETWebClientResponseDto } from "@/lib/dtos/web/clients.response.dto";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/constants";

export async function POST(req: NextRequest) {
    try {
        const credential: POSTLoginRequestDto = await req.json();
        const login = withLogin<POSTLoginRequestDto, POSTLoginResponseDto>(post, DEFAULT_WITH_LOGIN_OPTIONS);
        console.log(endpoints.AUTHENTICATION.AUTH.LOGIN);
        await login(endpoints.AUTHENTICATION.AUTH.LOGIN, { body: credential, headers: CONTENT_TYPE_APPLICATION_JSON });
        const getPreferences = withAuth<any, Omit<GETWebClientResponseDto, 'user'>>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const preferences: GETWebClientResponseDto = await getPreferences(endpoints.WEB.CLIENT.FIND, {});

        const getUser = withAuth<any, GETUserResponseDto>(get, DEFAULT_WITH_LOGIN_OPTIONS);
        const user: GETUserResponseDto = await getUser(endpoints.USER.USER.FIND_ONE, { cache: false });

        return NextResponse.json({ ...preferences, user }, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}