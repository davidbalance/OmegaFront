import NextAuth from 'next-auth';
import { authOptions } from './auth.utils';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


declare module "next-auth" {
    interface User {
        id?: string;
        access_token: string;
        refresh_token: string;
    }

    interface Session {
        access_token: string;
        session: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        session: string;
        access_token: string;
        refresh_token: string;
    }
}