'use server'

import authConfig from "@/config/auth.config"
import { AuthChangePassword, AuthLoginDelegate, AuthLogoutDelegate, AuthRefreshDelegate, AuthRegisterDelegate, AuthResponse } from "../auth.types"
import { AuthChangePasswordError, AuthLoginError, AuthRefreshError, AuthRegisterError } from "../auth.errors";

export const omegaLogin: AuthLoginDelegate = async (value) => {
    const response = await fetch(authConfig.loginUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new AuthLoginError();
    }

    const data: { accessToken: string; refreshToken: string } = await response.json();
    return {
        access_token: data.accessToken,
        refresh_token: data.refreshToken
    };
}

export const omegaRefresh: AuthRefreshDelegate = async (value) => {
    const response = await fetch(authConfig.refreshUri, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${value}` },
    });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new AuthRefreshError(value);
    }

    const data: { accessToken: string; refreshToken: string } = await response.json();
    return {
        access_token: data.accessToken,
        refresh_token: data.refreshToken
    };
}

export const omegaRegister: AuthRegisterDelegate = async (payload, access) => {
    const response = await fetch(authConfig.signupUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new AuthRegisterError();
    }
}

export const omegaLogout: AuthLogoutDelegate = async (value) => {
    const response = await fetch(authConfig.logoutUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${value}`,
        }
    });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new AuthRegisterError();
    }
}

export const omegaChangePassword: AuthChangePassword = async (email, password) => {
    const response = await fetch(authConfig.changePasswordUri, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new AuthChangePasswordError();
    }
}