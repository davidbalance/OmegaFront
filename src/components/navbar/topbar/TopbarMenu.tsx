import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { USER_KEY } from '@/lib/constants';
import { UserPreferenceData } from '@/lib/types/user-preferences.type';
import { ActionIcon, Avatar, Box, Divider, Group, Menu, Text, rem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'

const TopbarMenu: React.FC = () => {
    const [user] = useLocalStorage<UserPreferenceData | null>(USER_KEY, null);
    const { logout } = useAuth();
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
                        <Box>
                            <Text fw={500}>{`${user?.lastname} ${user?.name}`}</Text>
                            <Text size="xs" c="dimmed">
                                {user?.email}
                            </Text>
                        </Box>
                        <Avatar
                            variant='transparent'
                            color='omegaColors' />
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