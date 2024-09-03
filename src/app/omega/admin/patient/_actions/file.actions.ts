'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { revalidatePath } from "next/cache";

export const retriveBlob = async (id: number, type: string): Promise<Blob> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    try {
        const blob: Blob = await omega()
            .addBody({ id, type })
            .addToken(session.access_token)
            .execute('medicalFileSingle');
        return blob;
    } catch (error) {
        revalidatePath('');
        throw error;
    }
}