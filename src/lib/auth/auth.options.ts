import { AuthOptions } from "next-auth";
import { omegaProvider } from "./auth.provider";
import { isTokenValid } from "../is-token-valid";
import { refreshStrategy } from "./auth.utils";
import { createSession, retriveAccess, retriveRefresh } from "@/server/session.actions";
import authConfig from "@/config/auth.config";

const authOptions: AuthOptions = {
    providers: [omegaProvider],
    secret: authConfig.secret,
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
                    const data = await createSession({ access: user.access_token, refresh: user.refresh_token });
                    return {
                        ...user,
                        session: data
                    };
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
            let tokens: { token: string, refresh: string };
            try {
                const access = await retriveAccess(token.session);
                const refresh = await retriveRefresh(token.session);
                tokens = { token: access, refresh: refresh };
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
            return await refreshStrategy(token, tokens);
        },
        session: async ({ session, token }) => {
            if (token) {
                session.access_token = token.access_token;
                session.session = token.session;
            }
            return session;
        }
    }
}

export default authOptions;