import { JWT } from "next-auth/jwt";
import omega from "../api-client/omega-client/omega";

export const refreshStrategy = async (token: JWT, current: { token: string, refresh: string }): Promise<JWT> => {
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