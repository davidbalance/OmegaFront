'user server'

import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./lib/constants";

const secureRoutes = ['/omega']

export default function middleware(req: NextRequest) {
    const isLogged = !!req.cookies.get(AUTH_TOKEN_COOKIE) && !!req.cookies.get(REFRESH_TOKEN_COOKIE)

    const { pathname, origin } = req.nextUrl;
    if (!isLogged && secureRoutes.some(e => new RegExp(`^${e}`).test(pathname))) {
        return NextResponse.redirect(new URL('/login', origin));
    }

    const loginRegExp = new RegExp(`^/login`);
    if (isLogged && loginRegExp.test(pathname)) {
        return NextResponse.redirect(new URL('/omega', origin));
    }
    return NextResponse.next();
}