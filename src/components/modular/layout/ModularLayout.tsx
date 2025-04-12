import { Flex, rem, Stack, StackProps } from '@mantine/core';
import React from 'react'

interface ModularLayoutProps extends Omit<StackProps, 'gap'> { }
const ModularLayout: React.FC<ModularLayoutProps> = ({ children, ...props }) => {
    return (
        <Stack
            h='100%'
            mah='100%'
            maw='100%'
            gap={rem(8)}
            pos='relative'
            {...props}>
            {children}
        </Stack>
    )
}

export default ModularLayout