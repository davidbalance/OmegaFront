import { Group, rem, Title, Flex } from '@mantine/core'
import React from 'react'

type HeaderProps = {
    /**
     * Texto que sera colocado en el encabezado.
     */
    text: string;
    /**
     * Componentes de React que pueden ser colocados al mismo nivel que el encabezado.
     */
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