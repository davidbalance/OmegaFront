import { prismaFindOne, prismaFindOneByEmail, prismaSaveAsync } from "./adapter/prisma.adapter";
import { FindOneSessionAsyncFunc, FindOneSessionByEmailAsyncFunc, SaveSessionAsyncFunc } from "./application/session-token.application";

export const findOneSession: FindOneSessionAsyncFunc = prismaFindOne;
export const findOneSessionByEmail: FindOneSessionByEmailAsyncFunc = prismaFindOneByEmail;
export const saveSessionAsync: SaveSessionAsyncFunc = prismaSaveAsync;