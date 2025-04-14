import { Box, Flex, rem } from '@mantine/core'
import React from 'react'
import { ModularBox } from '../modular/box/ModularBox'
import BackButton from './back-button'
import Title from './mantine/title'

interface ReturnableHeaderProps {
    title: string
}
const ReturnableHeader: React.FC<ReturnableHeaderProps> = ({ title }) => {
    return (
        <ModularBox>
            <Flex
                component='div'
                align='center'
                justify='flex-start'
                direction='row'
                gap={rem(16)}
                wrap='nowrap'>
                <BackButton />
                <Box w='100%'>
                    <Title ta='left' order={4}>{title}</Title>
                </Box>
            </Flex>
        </ModularBox>
    )
}

export default ReturnableHeader