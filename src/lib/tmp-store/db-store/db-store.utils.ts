"use server"

import prisma from "@/lib/session-token/adapter/prisma"
import { RetriveFromTmpStoreDelegate, StoreInTmpStoreDelegate, RemoveFromTmpStoreDelegate } from "../tmp-store.types"

export const retriveFromTempSource: RetriveFromTmpStoreDelegate = async (key) => {
    const value = await prisma.tempRecord.findFirst({ where: { key: key } });
    if (!value) return { isSuccess: false, error: 'Temporal data not found' };
    if (Date.now() < value.expiresAt.getMilliseconds()) {
        await prisma.tempRecord.delete({ where: { key: key } });
        return { isSuccess: false, error: 'Expired data not found' };
    }

    return { isSuccess: true, value: value.data as any };
}

export const storeInTempSource: StoreInTmpStoreDelegate = async (key, value, expiresAt) => {
    const data = await prisma.tempRecord.findFirst({ where: { key: key } });
    if (data)
        await prisma.tempRecord.updateMany({ data: { data: value, expiresAt: expiresAt }, where: { key: key } });
    else
        await prisma.tempRecord.create({ data: { expiresAt: expiresAt, key: key, data: value } });

    return { isSuccess: true, value: 'Ok' }
}

export const removeFromTempSource: RemoveFromTmpStoreDelegate = async (key) => {
    await prisma.tempRecord.delete({ where: { key: key } });

    return { isSuccess: true, value: 'Ok' }
}