'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { revalidatePath } from "next/cache";

export type CredentialBody = { email: string; password: string; };
export const createCredential = async (user: number, body: CredentialBody): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...body, user })
        .execute('credentialCreate');
    revalidatePath('/omega/admin/doctor');
}

export const changePassword = async (email: string, password: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ email, password })
        .execute('passwordUpdate');
}