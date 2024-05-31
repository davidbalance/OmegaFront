import { Group, rem, Title, Flex } from '@mantine/core'
import React from 'react'

type HeaderProps = {
    text: string;
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children, text }) => {
    return (
        <Group justify='flex-start' align='center'>
            <Title
                order={4}
                component='span'>
                {text}
            </Title>
            <Flex gap={rem(4)}>
                {children}
            </Flex>
        </Group>
    )
}

export { Header }