import { AuthOptions } from "next-auth";
import { omegaCredentialProvider } from "./auth.providers";
import { isTokenValid, refresh } from "./auth.utils";
import { findOneSession, saveSessionAsync } from "../session-token";
import { addAccessToken } from "../session-token/domain/session-token.domain";

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
            const currentSession = await findOneSession(token.session);
            if (!currentSession) throw new Error('Token not found.');
            if (isTokenValid(currentSession.access ?? '')) return token;
            const data = await refresh(currentSession.refresh ?? '');
            const updatedSession = addAccessToken({ ...currentSession })({ access: data.access_token, refresh: data.refresh_token });
            await saveSessionAsync(updatedSession);
            console.log(updatedSession);
            return {
                ...token,
                access_token: updatedSession.access!,
                refresh_token: updatedSession.refresh!
            };
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