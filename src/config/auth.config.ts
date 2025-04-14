import { z } from "zod";
import { validateZodEnv } from "./_utils";

interface AuthConfig {
    signupUri: string;
    loginUri: string;
    logoutUri: string;
    refreshUri: string;
    changePasswordUri: string;
}

const config: AuthConfig = {
    signupUri: process.env.AUTH_SIGNIN_URI || '',
    loginUri: process.env.AUTH_LOGIN_URI || '',
    logoutUri: process.env.AUTH_LOGOUT_URI || '',
    refreshUri: process.env.AUTH_REFRESH_URI || '',
    changePasswordUri: process.env.AUTH_CHANGE_PASSWORD_URI || '',
}

const schema = z.object({
    signupUri: z.coerce.string().url().nonempty(),
    loginUri: z.coerce.string().url().nonempty(),
    logoutUri: z.coerce.string().url().nonempty(),
    refreshUri: z.coerce.string().url().nonempty(),
    changePasswordUri: z.coerce.string().url().nonempty(),
});

export default Object.freeze(validateZodEnv(schema)(config));