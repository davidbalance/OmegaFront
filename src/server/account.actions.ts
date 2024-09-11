'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth"
import omega from "@/lib/api-client/omega-client/omega";

export const logout = async (): Promise<void> => {
    const session = await auth();
    await omega()
        .removeSession(session.session);
    await omega()
        .addToken(session.access_token)
        .revokeAuthentication()
}