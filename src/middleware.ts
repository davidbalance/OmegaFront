import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname, origin } = req.nextUrl;

    if (token && pathname === '/login') return NextResponse.redirect(new URL('/omega', origin));
    if (!token && pathname === '/omega') return NextResponse.redirect(new URL('/login', origin));

    const auth = withAuth(req as any, {
        callbacks: {
            authorized: () => true
        },
        pages: {
            signIn: '/login',
        }
    });

    return auth
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
};