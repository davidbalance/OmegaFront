'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth/auth";
import { deleteSession } from "./session.actions";

export const logout = async (): Promise<void> => {
    const session = await auth();
    await deleteSession(session.session);
    await omega()
        .addToken(session.access_token)
        .revokeAuthentication()
}