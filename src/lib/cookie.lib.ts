'use server'

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const cookieStore = cookies();
const getCookie = async (key: string): Promise<string | undefined> => {
    return new Promise((resolve) => {
        const value = cookieStore.get(key)?.value;
        resolve(value);
    });
}

const setCookie = async (key: string, value: string, options: Partial<ResponseCookie> | undefined): Promise<void> => {
    return new Promise((resolve) => {
        cookieStore.set(key, value, options);
        resolve();
    });
}

const removeCookie = async (key: string): Promise<void> => {
    return new Promise((resolve) => {
        cookieStore.delete(key);
        resolve();
    });
}

export { getCookie, setCookie, removeCookie }