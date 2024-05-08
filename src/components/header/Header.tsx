import { Group, rem, Center, Tooltip, ActionIcon, Title } from '@mantine/core'
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
            <Title
                order={6}
                tt="uppercase"
                component='span'
                c="omegaColors">
                {children}
            </Title>
            {
                button &&
                button.show && <Center>
                    <Tooltip label={'Crear usuario'}>
                        <ActionIcon
                            size='sm'
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