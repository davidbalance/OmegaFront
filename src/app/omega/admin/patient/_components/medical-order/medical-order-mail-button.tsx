'use client'

import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { ActionIcon, ActionIconProps, rem, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSend, IconSendOff } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MedicalClientModalEmailSelection from '../../../../../../components/medical/client/modal/MedicalClientModalEmailSelection';
import { useDisclosure } from '@mantine/hooks';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';
import { sendEmail } from '../../_actions/medical-email.actions';

interface MedicalOrderMailButtonProps {
    email: MedicalClientEmail[]
    id: number;
    mailStatus: boolean;
}

const MedicalOrderMailButton: React.FC<MedicalOrderMailButtonProps> = ({
    id,
    email,
    mailStatus
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpened, { open: openModal, close: modalClose }] = useDisclosure(false);
    const { show } = useConfirmation();

    const handleClickEvent = useCallback(async () => {
        const defaultEmail = email.find(e => e.default);

        if (email.length > 1) {
            if (defaultEmail) {
                const state = await show('Enviar correo', `¿Deseas enviar a ${defaultEmail.email}?`);
                if (state) {
                    triggerSend(defaultEmail.id);
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
                triggerSend(currentEmail.id);
            }
        } else {
            notifications.show({ message: 'No se tienen correos registrados', color: 'red' });
        }
    }, [show, openModal, id, email]);

    const handleSelectionEvent = (data: MedicalClientEmail) => {
        triggerSend(data.id);
        modalClose();
    };

    const triggerSend = useCallback(async (mail: number) => {
        setLoading(true);
        try {
            await sendEmail(id, mail)
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [id]);

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
                onClose={modalClose} />

            <Tooltip
                label='Enviar Correo'>
                <ActionIcon loading={loading} onClick={handleClickEvent} {...currentButtonProps}>
                    <CurrentIcon style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default MedicalOrderMailButton;