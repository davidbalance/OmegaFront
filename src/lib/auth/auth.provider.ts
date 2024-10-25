import Credentials from "next-auth/providers/credentials";
import omega from "../api-client/omega-client/omega";
import { User } from "next-auth";

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

