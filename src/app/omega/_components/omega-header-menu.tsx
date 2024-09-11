import { auth } from '@/app/api/auth/[...nextauth]/auth';
import omega from '@/lib/api-client/omega-client/omega';
import { Menu, ActionIcon, Avatar, Group, Box, Divider, Text, MenuTarget, MenuDropdown, MenuItem } from '@mantine/core'
import { redirect } from 'next/navigation';
import React from 'react'
import OmegaMenuItemLogout from './omega-menu-item-logout';
import { User } from '@/lib/dtos/user/user/base.response.dto';

const getUser = async (): Promise<{ lastname: string, name: string, email: string }> => {
    const session = await auth();
    if (!session) redirect('/login');
    const data: User = await omega().addToken(session.access_token).execute('accountDetail');
    return data;
}

const OmegaHeaderMenu: React.FC = async () => {
    let user;
    try {
        user = await getUser();
    } catch (error) {
        console.error(error);
        return null;
    }

    return (
        <Menu withArrow>
            <MenuTarget>
                <ActionIcon variant='transparent'>
                    <Avatar variant='transparent' color='orange' />
                </ActionIcon>
            </MenuTarget>
            <MenuDropdown>
                <MenuItem>
                    <Group>
                        <Box>
                            <Text fw={500}>{`${user?.lastname} ${user?.name}`}</Text>
                            <Text size="xs" c="dimmed">
                                {user?.email}
                            </Text>
                        </Box>
                        <Avatar
                            variant='transparent'
                            color='orange' />
                    </Group>
                </MenuItem>
                <Divider />
                <OmegaMenuItemLogout />
            </MenuDropdown>
        </Menu>
    )
}

export default OmegaHeaderMenu