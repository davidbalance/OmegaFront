import { InvalidTokenError } from "./auth.errors";
import { AuthChangePassword, AuthLoginDelegate, AuthLogoutDelegate, AuthRefreshDelegate, AuthRegisterDelegate } from "./auth.types";
import { omegaChangePassword, omegaLogin, omegaLogout, omegaRefresh, omegaRegister } from "./omega/omega.utils";

export const login: AuthLoginDelegate = omegaLogin;
export const refresh: AuthRefreshDelegate = omegaRefresh;
export const register: AuthRegisterDelegate = omegaRegister;
export const logout: AuthLogoutDelegate = omegaLogout;
export const changePassword: AuthChangePassword = omegaChangePassword;

export const isTokenValid = (token: string): boolean => {
    const tokens = token.split('.');
    if (tokens.length <= 1) throw new InvalidTokenError();
    const payload = JSON.parse(atob(tokens[1]));
    return payload.exp > Date.now() / 1000;
}