import NextAuth from 'next-auth';

declare module "next-auth" {
    interface User {
        id?: string;
        access_token: string;
        refresh_token: string;
    }

    interface Session {
        access_token: string;
        refresh_token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token: string;
        refresh_token: string;
    }
}