'use client'

import { ActionIcon, ActionIconProps, rem, Tooltip } from '@mantine/core';
import { IconSend, IconSendOff } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface OrderEmailButtonProps {
    patientDni: string;
    orderId: string;
    orderMail: boolean;
}
const OrderEmailButton: React.FC<OrderEmailButtonProps> = ({
    patientDni,
    orderId,
    orderMail,
}) => {

    const currentButtonProps = useMemo((): ActionIconProps => orderMail
        ? { variant: 'light', color: 'neutral' }
        : {},
        [orderMail]);

    const CurrentIcon = useMemo(() => orderMail
        ? IconSend
        : IconSendOff,
        [orderMail]);

    return (
        <Tooltip
            label='Enviar Correo'>
            <ActionIcon
                component={Link}
                href={`/omega/order/${orderId}/email/${patientDni}`}
                {...currentButtonProps}>
                <CurrentIcon style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
            </ActionIcon>
        </Tooltip>
    )
}

export default OrderEmailButton;