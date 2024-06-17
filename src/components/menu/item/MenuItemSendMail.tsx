import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { Menu, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconSend } from '@tabler/icons-react'
import React, { useCallback, useEffect } from 'react'

interface MenuItemSendMailProps {
    url: string;
    onSend?: () => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
}
const MenuItemSendMail: React.FC<MenuItemSendMailProps> = ({ url, onSend, onComplete, onError }) => {

    const {
        data: mail,
        error: mailError,
        reload: sendMail,
        reset: sendReset
    } = useFetch(url, 'GET', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleClickEventSendMail = useCallback(async () => {
        const state = await show('Enviar correo', '¿Se va a enviar un correo esta seguro?');
        if (state) {
            sendMail();
            onSend?.();
        }
    }, [sendMail, show]);

    useEffect(() => {
        if (mail) {
            onComplete?.();
            notifications.show({ message: 'Correo enviado', color: 'green' });
            sendReset();
        }
    }, [mail, onComplete, sendReset]);

    useEffect(() => {
        if (mailError) {
            onError?.(mailError);
            notifications.show({ message: mailError.message, color: 'red' });
        }
    }, [mailError]);

    return (
        <Menu.Item onClick={handleClickEventSendMail} leftSection={<IconSend style={{ width: rem(16), height: rem(16) }} />}>
            Enviar correo
        </Menu.Item>
    )
}

export { MenuItemSendMail }