import { AuthOptions } from "next-auth";
import { omegaCredentialProvider } from "./auth.providers";
import { isTokenValid, refresh } from "./auth.utils";

const options: AuthOptions = {
    providers: [omegaCredentialProvider],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return { ...token, ...user }
            }
            if (isTokenValid(token.access_token)) return token;
            const data = await refresh(token.refresh_token);
            return { ...token, ...data };
        },
        session: async ({ session, token }) => {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
            }
            return session;
        }
    }
}

export default options;