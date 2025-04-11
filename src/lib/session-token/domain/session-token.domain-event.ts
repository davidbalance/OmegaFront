import { SessionToken } from "./session-token.domain";

export type DomainEvent<T = unknown> = {
    readonly key: string;
    readonly value: T;
}

const SessionTokenDomain = {
    Created: "session-token.created",
    Removed: "session-token.removed",
    AccessAdded: "session-token.access-added",
}

export const isSessionCreatedEvent = (event: DomainEvent): event is DomainEvent<SessionToken> => event.key === SessionTokenDomain.Created;
export const isSessionAccessAddedEvent = (event: DomainEvent): event is DomainEvent<AccessTokenAddedPayload> => event.key === SessionTokenDomain.AccessAdded;
export const isSessionRemovedEvent = (event: DomainEvent): event is DomainEvent<SessionRemovedPayload> => event.key === SessionTokenDomain.Removed;

export const createSessionEvent = (value: SessionToken): DomainEvent<SessionToken> => ({ key: SessionTokenDomain.Created, value });

type SessionRemovedPayload = { id: string; };
export const removeSessionEvent = (value: SessionRemovedPayload): DomainEvent<SessionRemovedPayload> => ({ key: SessionTokenDomain.Removed, value });

type AccessTokenAddedPayload = { id: string; access: string; refresh: string; };
export const addAccessTokenEvent = (value: AccessTokenAddedPayload): DomainEvent<AccessTokenAddedPayload> => ({ key: SessionTokenDomain.AccessAdded, value });