'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { revalidatePath } from "next/cache";

export const addCredential = async (id: number, data: { email: string, password: string }): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addBody({ ...data, user: id })
        .execute('credentialCreate');
    revalidatePath('omega/admin/doctor');
}