import { FetchHookResult } from "@/lib/types/fetch-hook.interface";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "../useFetch/useFetch";
import { UserPreferenceData, UserPreferences } from "@/lib/types/user-preferences.type";
import { LOGO_KEY, RESOURCE_KEY, USER_KEY } from "@/lib/constants";
import { NavLinkProp } from "@/lib/types/nav-link.type";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import { AuthCredentials } from "@/lib/dtos/auth/request.dto";

export interface AuthOptions { }

interface AuthResult extends Omit<FetchHookResult<any>, 'data'> {
    login: (body: AuthCredentials) => void;
    logout: () => void;
}

export const useAuth = (): AuthResult => {

    const [error, setError] = useState<Error | null>(null);
    const [shouldRequestLogin, setShouldRequestLogin] = useState<boolean>(false);
    const [shouldRequestLogout, setsShouldRequestLogout] = useState<boolean>(false)

    const router = useRouter();

    const {
        data: loginData,
        body: loginBody,
        error: loginError,
        loading: loginLoading,
        reload: loginReload,
        request: loginRequest,
        reset: loginReset
    } = useFetch<UserPreferences>("/api/auth/login", "POST", { loadOnMount: false });

    const {
        data: logoutData,
        error: logoutError,
        loading: logoutLoading,
        reload: logoutReload
    } = useFetch("/api/auth/logout", "POST", { loadOnMount: false });

    const [_logo, {
        remove: logoRemove,
        save: logoSave
    }] = useLocalStorage<string>(LOGO_KEY, 'omega');

    const [_resource, {
        remove: resourceRemove,
        save: resourceSave
    }] = useLocalStorage<NavLinkProp[]>(RESOURCE_KEY, []);

    const [_user, {
        remove: preferenceRemove,
        save: preferenceSave
    }] = useLocalStorage<UserPreferenceData | null>(USER_KEY, null);

    const handleLogin = useCallback((body: AuthCredentials) => {
        loginRequest(body);
        setShouldRequestLogin(true);
    }, [loginRequest]);

    const handleLogout = useCallback(() => {
        setsShouldRequestLogout(true);
    }, []);

    useEffect(() => {
        if (loginError) setError(loginError);
        else if (logoutError) setError(logoutError);
    }, [loginError, logoutError]);

    useEffect(() => {
        if (loginData) {
            logoSave(loginData.logo.name);
            resourceSave(loginData.resources);
            preferenceSave(loginData.user);
            loginReset();
            router.refresh();
        }
    }, [loginData, loginReset, logoSave, resourceSave, preferenceSave]);

    useEffect(() => {
        if (shouldRequestLogin && loginBody) {
            loginReload();
            setShouldRequestLogin(false);
        }
    }, [loginReload, loginBody, shouldRequestLogin]);

    useEffect(() => {
        if (shouldRequestLogout) {
            setsShouldRequestLogout(false);
            logoutReload();
        }
    }, [shouldRequestLogout, logoutReload]);

    useEffect(() => {
        if (logoutData) {
            logoRemove();
            resourceRemove();
            preferenceRemove();
            router.replace('login');
        }
    }, [logoutData, logoRemove, resourceRemove, preferenceRemove]);


    const loading = loginLoading || logoutLoading;
    return { error, loading, login: handleLogin, logout: handleLogout };
}