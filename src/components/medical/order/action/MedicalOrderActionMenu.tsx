import { Menu, MenuTarget, Loader, ActionIcon, rem } from '@mantine/core';
import { IconDotsVertical, IconSend } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react'
import { useMail } from '@/hooks/useMail';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { notifications } from '@mantine/notifications';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/response.dto';
import MedicalClientModalEmailSelection from '../../client/modal/MedicalClientModalEmailSelection';
import { useDisclosure } from '@mantine/hooks';

const baseUrl = (order: number, mail: number) => `/api/medical/orders/mail/${order}/${mail}`;

interface MedicalOrderActionMenuProps {
    order: number;
    email: MedicalClientEmail[]
    onMailSend: (id: number, mailStatus: true) => void;
}
const MedicalOrderActionMenu: React.FC<MedicalOrderActionMenuProps> = ({ email, order, onMailSend }) => {

    const [opened, { open, close }] = useDisclosure(false);

    const { show } = useConfirmation();

    const {
        data: mailData,
        error: mailError,
        loading: mailLoading,
        send: mailSend,
        setUrl: setMailUrl,
        url: mailUrl
    } = useMail<any>();

    const handleClickEvent = useCallback(async () => {
        const defaultEmail = email.find(e => e.default);

        if (email.length > 1) {
            if (defaultEmail) {
                const state = await show('Enviar correo', `¿Deseas enviar a ${defaultEmail.email}?`);
                if (state) {
                    setMailUrl(baseUrl(order, defaultEmail.id));
                } else {
                    open();
                }
            } else {
                const state = await show('Enviar correo', 'No hay un correo marcado por defecto ¿Desea escoger uno?');
                if (state) {
                    open();
                }
            }
        } else if (email.length === 1) {
            const currentEmail = email[0];
            const state = await show('Enviar correo', `¿Deseas enviar a ${currentEmail.email}?`);
            if (state) {
                setMailUrl(baseUrl(order, currentEmail.id));
            }
        } else {
            notifications.show({ message: 'No se tienen correos registrados', color: 'red' });
        }
    }, [show, open, setMailUrl, order, email]);

    const handleSelectionEvent = useCallback((data: MedicalClientEmail) => {
        setMailUrl(baseUrl(order, data.id));
        close();
    }, [setMailUrl]);

    const handleCloseEvent = useCallback(() => close(), [close])

    useEffect(() => {
        if (mailData) {
            onMailSend(order, true);
        }
    }, [mailData, order, onMailSend]);

    useEffect(() => {
        if (mailError) notifications.show({ message: mailError.message, color: 'red' });
    }, [mailError]);

    useEffect(() => {
        if (mailUrl) {
            mailSend();
            setMailUrl(null);
        }
    }, [mailUrl, mailSend, setMailUrl]);

    return (
        <>
            <MedicalClientModalEmailSelection
                email={email}
                onSelection={handleSelectionEvent}
                opened={opened}
                onClose={handleCloseEvent} />

            <Menu disabled={mailLoading}>
                <MenuTarget>
                    {mailLoading
                        ? (
                            <Loader size='xs' />
                        ) : (
                            <ActionIcon variant="transparent">
                                <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        )}
                </MenuTarget>
                <Menu.Dropdown>
                    <Menu.Item onClick={handleClickEvent} leftSection={<IconSend style={{ width: rem(16), height: rem(16) }} />}>
                        Enviar correo
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export default MedicalOrderActionMenu