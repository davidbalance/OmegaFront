import { AuthOptions } from "next-auth";
import { omegaProvider } from "./auth.provider";
import omega from "../api-client/omega-client/omega";
import { isTokenValid } from "../is-token-valid";
import { refreshStrategy } from "./auth.utils";

const authOptions: AuthOptions = {
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
                session.session = token.session;
            }
            return session;
        }
    }
}

export default authOptions;