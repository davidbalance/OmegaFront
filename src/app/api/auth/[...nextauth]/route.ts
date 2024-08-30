import omega from '@/lib/api-client/omega-client/omega';
import { isTokenValid } from '@/lib/is-token-valid';
import NextAuth, { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { JWT } from 'next-auth/jwt';

const refreshStrategy = async (token: JWT, current: { token: string, refresh: string }): Promise<JWT> => {
    try {
        const newToken = await omega().refreshToken(current.refresh);
        await omega().updateSession(token.session, { token: newToken.access, refresh: newToken.refresh });
        return {
            ...token,
            access_token: newToken.access,
            refresh_token: newToken.refresh
        };
    } catch (error) {
        console.error(error);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

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
    secret: process.env.NEXT_NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                try {
                    const data = await omega().createSession({
                        token: user.access_token,
                        refresh: user.refresh_token
                    });
                    return {
                        ...user,
                        ...data
                    };
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
            let tokens: { token: string, refresh: string };
            try {
                tokens = await omega().retriveSession(token.session);
            } catch (error) {
                console.error(error);
                throw error;
            }
            if (isTokenValid(tokens.token)) {
                return {
                    ...token,
                    access_token: tokens.token,
                    refresh_token: tokens.token
                };
            }
            return refreshStrategy(token, tokens);
        },
        session: async ({ session, token }) => {
            if (token) {
                session.access_token = token.access_token;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export function auth(...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []) {
    return getServerSession(...args, authOptions);
}

export { handler as GET, handler as POST };


declare module "next-auth" {
    interface User {
        id?: string;
        access_token: string;
        refresh_token: string;
    }

    interface Session {
        access_token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        session: string;
        access_token: string;
        refresh_token: string;
    }
}