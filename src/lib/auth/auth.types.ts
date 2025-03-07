export type AuthLoginPayload = {
    email: string;
    password: string;
}

export type AuthResponse = {
    access_token: string;
    refresh_token: string;
}

export type AuthRegisterPayload = {
    dni: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    resources: string[];
    logo: string;
}

export type AuthLoginDelegate = (payload: AuthLoginPayload) => Promise<AuthResponse>;
export type AuthRefreshDelegate = (token: string) => Promise<AuthResponse>;
export type AuthRegisterDelegate = (payload: AuthRegisterPayload, access: string) => Promise<void>;
export type AuthLogoutDelegate = (access: string) => Promise<void>;
export type AuthChangePassword = (email: string, password: string) => Promise<void>;