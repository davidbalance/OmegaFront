import { getCookie, removeCookie, setCookie } from "@/lib/cookie.lib";
import { useEffect, useState } from "react";

interface CookieOptions {
    value: string;
    expiresAt: Date
}

const useToken = (key: string): [token: string | null, { save: (value: CookieOptions) => void, remove: () => void }] => {

    const [token, setToken] = useState<string | null>(null);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    useEffect(() => {
        getToken();
        return () => { }
    }, [shouldRefresh, token]);

    const getToken = async () => {
        const stored = await getCookie(key);
        setToken(stored || null);
    }

    const save = ({ value, expiresAt }: CookieOptions) => {
        setCookie(key, value, { expires: expiresAt });
        setShouldRefresh(prev => !prev);
    }

    const remove = () => {
        removeCookie(key);
        setShouldRefresh(prev => !prev);
    }

    return [token, { save, remove }];
}

export { useToken };