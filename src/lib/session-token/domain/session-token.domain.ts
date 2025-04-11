import { addAccessTokenEvent, createSessionEvent, DomainEvent, removeSessionEvent } from "./session-token.domain-event";

export type SessionToken = {
    readonly id: string;
    readonly email: string;
    readonly access: string | undefined | null;
    readonly refresh: string | undefined | null;
    events: ReadonlyArray<DomainEvent>;
}

export const createSessionToken = (value: Pick<SessionToken, 'email'>): SessionToken => {

    const token: SessionToken = {
        ...value,
        id: crypto.randomUUID(),
        access: null,
        refresh: null,
        events: []
    };

    return { ...token, events: [createSessionEvent(token)] };
};

export const addAccessToken = (token: SessionToken) =>
    (value: { access: string; refresh: string; }): SessionToken => ({
        ...token,
        access: value.access,
        refresh: value.refresh,
        events: [...token.events, addAccessTokenEvent({
            id: token.id,
            access: value.access,
            refresh: value.refresh
        })]
    });

export const removeSession = (token: SessionToken): SessionToken => ({
    ...token,
    access: null,
    refresh: null,
    events: [...token.events, removeSessionEvent({ id: token.id })]
});