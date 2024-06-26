import { Flex, FlexProps, rem } from '@mantine/core';
import React from 'react'

interface ModularLayoutProps extends Omit<FlexProps, 'gap'> {
    children: React.ReactNode;
}
const ModularLayout: React.FC<ModularLayoutProps> = ({ children, ...props }) => {
    return (
        <Flex
            h='100%'
            direction='column'
            gap={rem(8)}
            pos='relative'
            {...props}>
            {children}
        </Flex>
    )
}

export default ModularLayout