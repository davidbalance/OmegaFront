import { SessionToken } from "../domain/session-token.domain";

export type SaveSessionAsyncFunc = (value: SessionToken) => Promise<void>;
export type FindOneSessionAsyncFunc = (id: string) => Promise<SessionToken | null>;
export type FindOneSessionByEmailAsyncFunc = (email: string) => Promise<SessionToken | null>;