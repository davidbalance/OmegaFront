'use server'

import { Prisma, Token as PrismaToken } from "generated/prisma";
import { SessionToken } from "../domain/session-token.domain";
import prisma from "./prisma";
import { isSessionAccessAddedEvent, isSessionCreatedEvent, isSessionRemovedEvent } from "../domain/session-token.domain-event";
import { FindOneSessionAsyncFunc, FindOneSessionByEmailAsyncFunc, SaveSessionAsyncFunc } from "../application/session-token.application";

const prismaToDomain = (value: PrismaToken): SessionToken => ({
    ...value,
    events: []
});

const domainToPrisma = (value: SessionToken): Prisma.TokenCreateInput => ({
    id: value.id,
    email: value.email,
    access: value.access,
    refresh: value.refresh,
})

const createSession = async (value: SessionToken): Promise<void> => {
    try {
        console.log('Saving session...');
        const data = domainToPrisma(value);
        await prisma.token.create({ data });
        console.log('Sucessfully session saved...');
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error('Unknown error.')
    }
}

const addToken = async (value: { id: string; access: string; refresh: string }): Promise<void> => {
    try {
        console.log('Saving token...');
        await prisma.token.update({ where: { id: value.id }, data: { access: value.access, refresh: value.refresh } });
        console.log('Sucessfully token saved...');
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error('Unknown error.')
    }
}


const removeSession = async (value: { id: string; }): Promise<void> => {
    try {
        await prisma.token.delete({ where: { id: value.id } });
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error('Unknown error.')
    }
}

export const prismaFindOne: FindOneSessionAsyncFunc = async (id: string): Promise<SessionToken | null> => {
    const value = await prisma.token.findFirst({ where: { id } });
    return value ? prismaToDomain({ ...value }) : null;

}

export const prismaFindOneByEmail: FindOneSessionByEmailAsyncFunc = async (email: string): Promise<SessionToken | null> => {
    const value = await prisma.token.findUnique({ where: { email } });
    return value ? prismaToDomain({ ...value }) : null;
}


export const prismaSaveAsync: SaveSessionAsyncFunc = async (value: SessionToken): Promise<void> => {
    for (const event of value.events) {
        if (isSessionCreatedEvent(event)) await createSession(event.value);
        else if (isSessionAccessAddedEvent(event)) await addToken(event.value);
        else if (isSessionRemovedEvent(event)) await removeSession(event.value);
    }
}



