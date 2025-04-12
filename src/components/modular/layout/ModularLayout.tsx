<<<<<<< HEAD
import { Flex, rem, Stack, StackProps } from '@mantine/core';
import React from 'react'

interface ModularLayoutProps extends Omit<StackProps, 'gap'> { }
const ModularLayout: React.FC<ModularLayoutProps> = ({ children, ...props }) => {
    return (
        <Stack
            h='100%'
            mah='100%'
            maw='100%'
=======
import { Flex, FlexProps, rem } from '@mantine/core';
import React from 'react'

interface ModularLayoutProps extends Omit<FlexProps, 'gap'> { }
const ModularLayout: React.FC<ModularLayoutProps> = ({ children, ...props }) => {
    return (
        <Flex
            h='100%'
            direction='column'
>>>>>>> main
            gap={rem(8)}
            pos='relative'
            {...props}>
            {children}
<<<<<<< HEAD
        </Stack>
=======
        </Flex>
>>>>>>> main
    )
}

export default ModularLayout