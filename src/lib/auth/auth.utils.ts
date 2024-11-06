import { JWT } from "next-auth/jwt";
import omega from "../api-client/omega-client/omega";
import { updateSession } from "@/server/session.actions";

export const refreshStrategy = async (token: JWT, current: { token: string, refresh: string }): Promise<JWT> => {
    try {
        const newToken = await omega().refreshToken(current.refresh);
        await updateSession(token.session, newToken);
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