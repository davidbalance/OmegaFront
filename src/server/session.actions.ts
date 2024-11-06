'use server'

import prisma from "@/lib/prisma";

interface SessionPayload {
    access: string;
    refresh: string;
}
export async function createSession(body: SessionPayload): Promise<string> {
    const session = await prisma.session.create({ data: body });
    return session.session;
}

export async function retriveAccess(session: string): Promise<string> {
    const foundSession = await prisma.session.findFirst({ where: { session }, select: { access: true } });
    if (!foundSession) throw new Error('There was an error getting the session');
    return foundSession.access;
}

export async function retriveRefresh(session: string): Promise<string> {
    const foundSession = await prisma.session.findFirst({ where: { session }, select: { refresh: true } });
    if (!foundSession) throw new Error('There was an error getting the session');
    return foundSession.refresh;
}

export async function updateSession(session: string, data: SessionPayload): Promise<void> {
    const foundSession = await prisma.session.update({ where: { session: session }, data });
    if (!foundSession) throw new Error('There was an error getting the session');
}

export async function deleteSession(session: string): Promise<void> {
    const foundSession = await prisma.session.delete({ where: { session: session } });
    if (!foundSession) throw new Error('There was an error getting the session');
}