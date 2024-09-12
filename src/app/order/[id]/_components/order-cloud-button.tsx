'use client'

import { rem, Stack, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useCloudCheck } from './order-cloud-check.context'

interface OrderCloudButtonProps {
    children: React.ReactNode
}
const OrderCloudButton: React.FC<OrderCloudButtonProps> = ({
    children
}) => {

    const { toggle } = useCloudCheck();

    return (
        <UnstyledButton
            w='100%'
            onClick={toggle}>
            <Stack
                w='100%'
                gap={rem(8)}>
                {children}
            </Stack>
        </UnstyledButton>)
}

export default OrderCloudButton