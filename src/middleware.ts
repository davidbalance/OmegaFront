import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { pathname, origin } = req.nextUrl;
        if (req.nextauth.token) {
            if (pathname === '/login') {
                return NextResponse.redirect(new URL('/login', origin));
            }
        }
        return NextResponse.next();
    }, {
    pages: {
        signIn: '/login',
    },
}
);

export const config = {
    matcher: ['/omega/:path*'],
};