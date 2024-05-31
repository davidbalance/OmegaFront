import { useAuth } from '@/hooks';
import { ActionIcon, Avatar, Divider, Group, Menu, Text, rem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'

const TopbarMenu: React.FC = () => {
    const { logout, user } = useAuth();
    return (
        <Menu withArrow>
            <Menu.Target>
                <ActionIcon variant='transparent'>
                    <Avatar variant='transparent' color='omegaColors' />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item>
                    <Group>
                        <Avatar
                            variant='transparent'
                            color='omegaColors' />

                        <div>
                            <Text fw={500}>{`${user?.lastname} ${user?.name}`}</Text>
                            <Text size="xs" c="dimmed">
                                {user?.email}
                            </Text>
                        </div>
                    </Group>
                </Menu.Item>
                <Divider />
                <Menu.Item
                    onClick={logout}
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                    Cerrar Sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { TopbarMenu }