import { Group, rem, Center, Tooltip, ActionIcon, Text } from '@mantine/core'
import React from 'react'

type HeaderProps = {
    children: React.ReactNode;
    button?: {
        icon: React.ElementType;
        onClick: () => void;
        show: boolean;
    }
}

const Header: React.FC<HeaderProps> = ({ children, button }) => {
    return (
        <Group justify="space-between" mb={rem(16)}>
            <Text
                tt="uppercase"
                fw={700}
                component='span'
                variant='text'
                c="omegaColors"
                size='lg'>
                {children}
            </Text>
            {
                button &&
                button.show && <Center>
                    <Tooltip label={'Crear usuario'}>
                        <ActionIcon
                            size='lg'
                            variant="transparent"
                            onClick={button.onClick}>
                            <button.icon
                                style={{ width: rem(64), height: rem(64) }}
                                stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                </Center>
            }
        </Group>
    )
}

export { Header }