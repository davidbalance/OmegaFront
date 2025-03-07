import { Menu, ActionIcon, Avatar, Group, Box, Divider, Text, MenuTarget, MenuDropdown, MenuItem } from '@mantine/core'
import React from 'react'
import OmegaMenuItemLogout from './omega-menu-item-logout';

const OmegaHeaderMenu: React.FC<{
    lastname: string;
    name: string;
    email: string;
}> = async ({
    email,
    lastname,
    name
}) => {
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
                                <Text fw={500}>{`${lastname} ${name}`}</Text>
                                <Text size="xs" c="dimmed">
                                    {email}
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