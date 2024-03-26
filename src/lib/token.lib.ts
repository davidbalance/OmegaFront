'use server'
import dayjs from "dayjs";
import { cookies } from "next/headers";

const AUTH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'AUTH-TOKEN';
const REFRESH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'REFRESH-TOKEN';

export const getBearer = async (): Promise<string | undefined> => {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
    if (!token) return;
    return `Bearer ${token}`;
}

export const getBearerRefresh = async (): Promise<string | undefined> => {
    const cookieStore = cookies();
    const token = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    if (!token) return;
    return `Bearer ${token}`;
}

type Token = { token: string, expiresAt: string }
export const setTokens = (tokens: { access: Token, refresh: Token }): void => {
    const cookieStore = cookies();
    cookieStore.set(AUTH_TOKEN_COOKIE, tokens.access.token, { expires: dayjs(tokens.refresh.expiresAt).toDate(), httpOnly: true });
    cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refresh.token, { expires: dayjs(tokens.refresh.expiresAt).toDate(), httpOnly: true });
}

export const removeTokens = (): void => {
    const cookieStore = cookies();
    cookieStore.delete(AUTH_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export const hasTokens = (): boolean => {
    const cookieStore = cookies();
    const authToken = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    return !!authToken && !!refreshToken;
}