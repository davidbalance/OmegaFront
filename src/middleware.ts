import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const { origin } = req.nextUrl;

    if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
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