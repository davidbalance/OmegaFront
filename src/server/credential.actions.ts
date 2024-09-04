'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";

export const changePassword = async (email: string, password: string): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addBody({ email, password })
        .execute('passwordUpdate');
}