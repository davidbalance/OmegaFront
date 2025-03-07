export class AuthLoginError extends Error {
    constructor() {
        super("Login failed.");
    }
}

export class AuthRefreshError extends Error {
    constructor(token: string) {
        super(`Invalid Token. Token=${token}`);
    }
}

export class AuthRegisterError extends Error {
    constructor() {
        super(`Register user failed.`);
    }
}

export class AuthLogoutError extends Error {
    constructor() {
        super(`Logout user failed.`);
    }
}

export class AuthChangePasswordError extends Error {
    constructor() {
        super(`Change password failed.`);
    }
}

export class InvalidTokenError extends Error {
    constructor() {
        super(`Invalid token`);
    }
}