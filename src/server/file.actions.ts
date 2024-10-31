'use server'

import auth from "@/lib/auth/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { revalidatePath } from "next/cache";

export const retriveFileBlob = async (id: number, type: string): Promise<Blob> => {
    try {
        const blob: Blob = await omega()
            .addBody({ id, type })
            .execute('medicalFileSingle');
        return blob;
    } catch (error) {
        revalidatePath('');
        throw error;
    }
}

type FileBody = { id: number, type: string };
export const retriveMultipleFileBlob = async (body: FileBody[]): Promise<Blob> => {
    const blob: Blob = await omega()
        .addBody({ files: body })
        .execute('medicalFileMultiple');
    return blob;
}


export const deleteFile = async (id: number, type: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id, type })
        .addToken(session.access_token)
        .execute('medicalFileDelete');
    revalidatePath('/omega/admin/order');
}

type TreeMeta = { year?: string, coporativeName?: string, company?: string, branch?: string, process?: string, patient?: string }
export const retriveFileTree = async (query: TreeMeta): Promise<Blob> => {
    const session = await auth();
    const blob: Blob = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('medicalFileTree');
    return blob;
}