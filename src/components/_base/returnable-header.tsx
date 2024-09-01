import { Box, rem, Title } from '@mantine/core'
import React from 'react'
import { ModularBox } from '../modular/box/ModularBox'
import BackButton from './back-button'

interface ReturnableHeaderProps {
    title: string
}
const ReturnableHeader: React.FC<ReturnableHeaderProps> = ({ title }) => {
    return (
        <ModularBox align='center' justify='flex-start' direction='row' gap={rem(16)}>
            <BackButton />
            <Box w='100%'>
                <Title ta='left' order={4}>{title}</Title>
            </Box>
        </ModularBox>
    )
}

export default ReturnableHeader