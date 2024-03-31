import { AuthenticationAPI } from "..";
import { root } from "../config";

export const AuthenticationEndpoint: AuthenticationAPI = {
    LOGIN: `${root}/auth/login`,
    REFRESH: `${root}/auth/refresh`,
    LOGOUT: `${root}/auth/logout`,
}