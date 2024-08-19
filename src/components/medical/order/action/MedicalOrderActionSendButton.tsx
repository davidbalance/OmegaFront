import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useMail } from '@/hooks/useMail';
import { ActionIcon, ActionIconProps, rem, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSend, IconSendOff } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import MedicalClientModalEmailSelection from '../../client/modal/MedicalClientModalEmailSelection';
import { useDisclosure } from '@mantine/hooks';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';

const baseUrl = (order: number, mail: number) => `/api/medical/orders/mail/${order}/${mail}`;

interface MedicalOrderActionSendButtonProps {
    /**
     * Indica si el correo ha sido o no enviado
     */
    mailStatus: boolean;
    /**
     * Idetnficador unico de la orden medica.
     */
    order: number;
    /**
     * Arreglo de correos electronicos.
     */
    email: MedicalClientEmail[]
    /**
     * Funcion que es invocada se envia el correo.
     * @param id 
     * @param mailStatus 
     * @returns 
     */
    onMailSend: (id: number, mailStatus: boolean) => void;
}

const MedicalOrderActionSendButton: React.FC<MedicalOrderActionSendButtonProps> = ({ email, onMailSend, order, mailStatus }) => {

    const [modalOpened, { open: openModal, close: modalClose }] = useDisclosure(false);

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
                    openModal();
                }
            } else {
                const state = await show('Enviar correo', 'No hay un correo marcado por defecto ¿Desea escoger uno?');
                if (state) {
                    openModal();
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
    }, [show, openModal, setMailUrl, order, email]);

    const handleSelectionEvent = useCallback((data: MedicalClientEmail) => {
        setMailUrl(baseUrl(order, data.id));
        modalClose();
    }, [setMailUrl, modalClose, order]);

    const handleCloseEvent = useCallback(() => modalClose(), [modalClose])

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

    const currentButtonProps = useMemo((): ActionIconProps => mailStatus
        ? { variant: 'light', color: 'neutral' }
        : {},
        [mailStatus]);

    const CurrentIcon = useMemo(() => mailStatus
        ? IconSend
        : IconSendOff,
        [mailStatus]);

    return (
        <>
            <MedicalClientModalEmailSelection
                email={email}
                onSelection={handleSelectionEvent}
                opened={modalOpened}
                onClose={handleCloseEvent} />

            <Tooltip
                label='Enviar Correo'>
                <ActionIcon loading={mailLoading} onClick={handleClickEvent} {...currentButtonProps}>
                    <CurrentIcon style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export { MedicalOrderActionSendButton }