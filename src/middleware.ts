import { NextRequest, NextResponse } from "next/server";
import { hasTokens } from "./services/config/tokenHandler"

const secureRoutes = ['/omega']

export default function middleware(req: NextRequest) {
    const isLogged = hasTokens();
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