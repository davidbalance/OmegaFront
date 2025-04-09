import Credentials from "next-auth/providers/credentials";
import { login } from "./auth.utils";
import { User } from "next-auth";
import { addAccessToken, createSessionToken, removeSession } from "../session-token/domain/session-token.domain";
import { findOneSessionByEmail, saveSessionAsync } from "../session-token";

const composeFunc = <A, B, C>(f: (value: A) => B, g: (value: B) => C) => (value: A) => g(f(value));
const initSession = composeFunc(createSessionToken, addAccessToken);
const removeSessionAsync = composeFunc(removeSession, saveSessionAsync);

const ensureUniqueSession = async (email: string): Promise<void> => {
    const value = await findOneSessionByEmail(email);
    if (value) await removeSessionAsync(value);
}

export const OMEGA_AUTH_PROVIDER: string = 'credentials';
export const omegaCredentialProvider = Credentials({
    name: OMEGA_AUTH_PROVIDER,
    credentials: {
        'email': { name: 'email', type: 'email' },
        'password': { name: 'password', type: 'password' }
    },
    authorize: async (credentials: Record<string, string> | undefined): Promise<User | null> => {
        if (!credentials) return null;
        try {
            const data = await login({
                email: credentials.email,
                password: credentials.password
            });

            await ensureUniqueSession(credentials.email);
            const session = initSession({ email: credentials.email })({ access: data.access_token, refresh: data.refresh_token });
            await saveSessionAsync(session);
            return {
                session: session.id,
                access_token: session.access!,
                refresh_token: session.refresh!
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});

