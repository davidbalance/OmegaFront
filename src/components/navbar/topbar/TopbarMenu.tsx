import { ActionIcon, Avatar, Menu, rem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'

const TopbarMenu: React.FC = () => {
    return (
        <Menu withArrow>
            <Menu.Target>
                <ActionIcon variant='transparent'>
                    <Avatar variant='transparent' color='omegaColors' />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                    Cerrar Sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { TopbarMenu }