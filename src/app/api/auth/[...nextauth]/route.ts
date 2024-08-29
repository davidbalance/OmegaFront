import omega from '@/lib/api-client/omega-client/omega';
import { isTokenValid } from '@/lib/is-token-valid';
import NextAuth, { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const omegaProvider = Credentials({
    credentials: {
        username: { name: 'username', type: 'email' },
        password: { name: 'password', type: 'password' }
    },
    authorize: async (credentials: Record<string, string> | undefined): Promise<User | null> => {
        if (!credentials) return null;

        try {
            const tokens = await omega().addBody(credentials).authenticate();
            return {
                access_token: tokens.access,
                refresh_token: tokens.refresh
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});

export const authOptions: AuthOptions = {
    providers: [omegaProvider],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (!isTokenValid(user.access_token)) {
                const newToken = await omega().refreshToken(user.refresh_token);
                user.access_token = newToken.access;
                user.refresh_token = newToken.refresh;
            }
            return {
                ...token,
                ...user
            }
        },
        session: async ({ session, token }) => {
            return { ...session, ...token }
        }
    }
}

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
        refresh_token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token: string;
        refresh_token: string;
    }
}