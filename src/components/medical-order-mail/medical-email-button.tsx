'use client'

import { ActionIcon, ActionIconProps, rem, Tooltip } from '@mantine/core';
import { IconSend, IconSendOff } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import { useMedicalEmail } from './medical-email.context';

interface MedicalEmailButtonProps {
    status: boolean;
}
const MedicalEmailButton: React.FC<MedicalEmailButtonProps> = ({ status }) => {

    const { trigger, loading } = useMedicalEmail();

    const handleClick = () => trigger();

    const currentButtonProps = useMemo((): ActionIconProps => status
        ? { variant: 'light', color: 'neutral' }
        : {},
        [status]);

    const CurrentIcon = useMemo(() => status
        ? IconSend
        : IconSendOff,
        [status]);

    return (
        <Tooltip
            label='Enviar Correo'>
            <ActionIcon
                loading={loading}
                onClick={handleClick}
                {...currentButtonProps}>
                <CurrentIcon style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
            </ActionIcon>
        </Tooltip>
    )
}

export default MedicalEmailButton;