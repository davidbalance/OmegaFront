import dayjs from "dayjs";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export function tokenOption(): Partial<ResponseCookie>;
export function tokenOption(expires: string): Partial<ResponseCookie>;
export function tokenOption(expiresOrEmpty?: string): Partial<ResponseCookie> {
    let expiresTime = dayjs().add(1, 'day').toDate();
    if (expiresOrEmpty) {
        expiresTime = dayjs(expiresOrEmpty).toDate();
    }
    return {
        httpOnly: true,
        expires: expiresTime,
        path: '/'
    }
}