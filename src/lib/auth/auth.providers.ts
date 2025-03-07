import Credentials from "next-auth/providers/credentials";
import { login } from "./auth.utils";
import { User } from "next-auth";

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
            })
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});

