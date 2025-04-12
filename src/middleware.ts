<<<<<<< HEAD
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
=======
'user server'

import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./lib/constants";
>>>>>>> main

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const { origin } = req.nextUrl;

<<<<<<< HEAD
    if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
=======
export default function middleware(req: NextRequest) {
    const isLogged = !!req.cookies.get(AUTH_TOKEN_COOKIE) && !!req.cookies.get(REFRESH_TOKEN_COOKIE)

    const { pathname, origin } = req.nextUrl;
    if (!isLogged && secureRoutes.some(e => new RegExp(`^${e}`).test(pathname))) {
        return NextResponse.redirect(new URL('/login', origin));
    }

    const loginRegExp = new RegExp(`^/login`);
    if (isLogged && loginRegExp.test(pathname)) {
>>>>>>> main
        return NextResponse.redirect(new URL('/omega', origin));
    }

    const auth = withAuth(req as any, {
        callbacks: { authorized: ({ token }) => !!token },
        pages: {
            signIn: '/login',
        }
    });

    return auth
}

export const config = {
    matcher: ['/omega/:path*'],
};