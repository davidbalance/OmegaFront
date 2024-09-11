import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { pathname, origin } = req.nextUrl;
        if (req.nextauth.token && pathname === '/login') return NextResponse.redirect(new URL('/omega', origin));
        if (!req.nextauth.token && pathname === '/omega') return NextResponse.redirect(new URL('/login', origin));
        return NextResponse.next();
    }, {
    callbacks: {
        authorized: () => true
    },
    pages: {
        signIn: '/login',
    },
}
);

export const config = {
    matcher: [
        '/omega/:path*',
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};