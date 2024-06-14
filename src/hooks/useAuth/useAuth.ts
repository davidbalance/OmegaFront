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

    const router = useRouter();

    const fetchLogin = useFetch<UserPreferences>("/api/auth/login", "POST", { loadOnMount: false });
    const fetchLogout = useFetch("/api/auth/logout", "POST", { loadOnMount: false });

    const [loginReload, setLoginReload] = useState<boolean>(false);

    const [_logo, handlerLogo] = useLocalStorage<string>(LOGO_KEY, 'omega')
    const [_resource, handlerResource] = useLocalStorage<NavLinkProp[]>(RESOURCE_KEY, [])
    const [_user, handlerUser] = useLocalStorage<UserPreferenceData | null>(USER_KEY, null)

    const handleLogin = (body: AuthCredentials) => {
        fetchLogin.request(body);
        const timeout = setTimeout(() => {
            setLoginReload(true);
            clearTimeout(timeout);
        }, 500);
    }

    const handleLogout = useCallback(() => {
        fetchLogout.reload();
    }, [fetchLogout]);

    useEffect(() => {
        if (fetchLogin.error) {
            setError(fetchLogin.error);
        } else if (fetchLogout.error) {
            setError(fetchLogout.error);
        }
    }, [fetchLogin.error, fetchLogout.error]);

    useEffect(() => {
        if (fetchLogout.data) {
            handlerLogo.remove();
            handlerResource.remove();
            handlerUser.remove();
            router.refresh();
        }
    }, [fetchLogout.data]);

    useEffect(() => {
        if (fetchLogin.data) {
            handlerLogo.save(fetchLogin.data.logo.name);
            handlerResource.save(fetchLogin.data.resources);
            handlerUser.save(fetchLogin.data.user);
            router.refresh();
        }
    }, [fetchLogin.data]);

    useEffect(() => {
        if (loginReload) {
            fetchLogin.reload();
            setLoginReload(false);
        }
    }, [loginReload, fetchLogin.reload])


    const loading = fetchLogin.loading || fetchLogout.loading;
    return { error, loading, login: handleLogin, logout: handleLogout };
}