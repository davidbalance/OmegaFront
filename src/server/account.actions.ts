'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth/auth";

export const logout = async (): Promise<void> => {
    const session = await auth();
    await omega()
        .removeSession(session.session);
    await omega()
        .addToken(session.access_token)
        .revokeAuthentication()
}