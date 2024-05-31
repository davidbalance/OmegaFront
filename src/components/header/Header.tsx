import { Group, rem, Title, Flex } from '@mantine/core'
import React from 'react'
import ModularBox from '../modular-box/ModularBox';

type HeaderProps = {
    text: string;
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children, text }) => {
    return (
        <ModularBox>
            <Group justify='flex-start' align='center'>
                <Title
                    order={3}
                    component='span'>
                    {text}
                </Title>
                <Flex gap={rem(4)}>
                    {children}
                </Flex>
            </Group>
        </ModularBox>
    )
}

export { Header }