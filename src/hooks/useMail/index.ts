import { useConfirmation } from "@/contexts/confirmation/confirmation.context";
import { useCallback, useEffect, useState } from "react"
import { useFetch } from "../useFetch";
import { FetchHookResult } from "@/lib/types/fetch-hook.interface";
import { notifications } from "@mantine/notifications";

interface MailResult<T> extends FetchHookResult<T> {
    /**
     * Url actual
     */
    url: string | null;
    /**
     * Actualiza la Url
     * @param newUrl 
     * @returns 
     */
    setUrl: (newUrl: string | null) => void;
    /**
     * Realiza el envio del correo
     * @returns 
     */
    send: () => void;
}

/**
 * 
 * @param initialUrl 
 * @returns 
 */
export const useMail = <T>(initialUrl?: string): MailResult<T> => {

    const [url, setUrl] = useState<string | null>(initialUrl || null);

    const {
        data: mail,
        loading: mailLoading,
        error: mailError,
        reload: sendMail,
        reset: sendReset
    } = useFetch<any>(url || '', 'GET', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleEventSendMail = useCallback(async () => {
        if (!url) {
            notifications.show({ message: 'url no asignada' });
            return;
        }
        const state = await show('Enviar correo', '¿Se va a enviar un correo esta seguro?');
        if (state) {
            sendMail();
        }
    }, [sendMail, show, url]);

    const handleUpdateUrl = useCallback((newUrl: string | null) => {
        setUrl(newUrl);
    }, []);

    useEffect(() => {
        if (mail) {
            sendReset();
        }
    }, [mail, sendReset]);

    return {
        data: mail,
        error: mailError,
        loading: mailLoading,
        url: url,
        setUrl: handleUpdateUrl,
        send: handleEventSendMail
    }
}