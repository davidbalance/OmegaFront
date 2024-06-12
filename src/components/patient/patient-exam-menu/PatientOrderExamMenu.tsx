import { useFetch } from '@/hooks/useFetch/useFetch';
import { Order } from '@/services/api/order/dtos';
import { Menu, MenuTarget, ActionIcon, rem, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconSend, IconX } from '@tabler/icons-react';
import React, { useEffect } from 'react'

interface PatientOrderMenuProps {
    data: Order;
    onMailSend: (data: Order) => void;
}
const PatientOrderMenu: React.FC<PatientOrderMenuProps> = ({ data, onMailSend }) => {

    const [disclosure, { close, open }] = useDisclosure(false)
    const { data: mail, loading: mailLoad, error: mailError, reload: sendMail, reset: sendReset } = useFetch(`/api/mailer/order/${data.id}`, 'GET', { loadOnMount: false });

    const handleClick = () => open();

    const handleClickEventSendMail = () => {
        sendMail();
    }

    useEffect(() => {
        if (mail) {
            const newOrder: Order = { ...data, mailStatus: true }
            onMailSend(newOrder);
            notifications.show({ message: 'Correo enviado', color: 'green' })
            sendReset();
        }
    }, [mail, data]);

    useEffect(() => {
        if (mailError) {
            notifications.show({ message: mailError.message, color: 'red' });
        }
    }, [mailError]);

    return (
        <Menu onClose={close} disabled={mailLoad}>
            <MenuTarget>
                {
                    mailLoad
                        ? <Loader size='xs' />
                        : <ActionIcon variant="transparent" onClick={handleClick}>
                            {disclosure ? <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} /> : <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                        </ActionIcon>
                }
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Item onClick={handleClickEventSendMail} leftSection={<IconSend style={{ width: rem(16), height: rem(16) }} />}>
                    Enviar correo
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { PatientOrderMenu }