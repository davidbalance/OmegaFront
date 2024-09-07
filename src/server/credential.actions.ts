'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";

export type CredentialBody = { email: string; password: string; };
export const createCredential = async (user: number, body: CredentialBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...body, user })
        .execute('passwordUpdate');
}

export const changePassword = async (email: string, password: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ email, password })
        .execute('passwordUpdate');
}