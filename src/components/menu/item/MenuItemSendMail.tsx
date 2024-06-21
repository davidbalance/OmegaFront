import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/response.dto';
import { Menu, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconSend } from '@tabler/icons-react'
import React, { useCallback, useEffect } from 'react'

interface MenuItemSendMailProps {
    order: number;
    email: MedicalClientEmail[],
    defaultMail?: MedicalClientEmail,
    onSend?: () => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
}
const MenuItemSendMail: React.FC<MenuItemSendMailProps> = ({ order, email, onSend, onComplete, onError }) => {

    const {
        data: mail,
        error: mailError,
        reload: sendMail,
        reset: sendReset
    } = useFetch(`/api/medical/orders/mail/${order}`, 'GET', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleClickEventSendMail = useCallback(async () => {
        const state = await show('Enviar correo', '¿Se va a enviar un correo esta seguro?');
        if (state) {
            sendMail();
            onSend?.();
        }
    }, [sendMail, show, onSend]);

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
    }, [mailError, onError]);

    return (
        <Menu.Item onClick={handleClickEventSendMail} leftSection={<IconSend style={{ width: rem(16), height: rem(16) }} />}>
            Enviar correo
        </Menu.Item>
    )
}

export { MenuItemSendMail }