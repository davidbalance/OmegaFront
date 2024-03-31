import { Token } from "@/lib";

export type AuthenticationLoginRS = {
    access: Token;
    refresh: Token;
}

export type RefreshTokenRS = AuthenticationLoginRS;

export type LogoutRS = {}