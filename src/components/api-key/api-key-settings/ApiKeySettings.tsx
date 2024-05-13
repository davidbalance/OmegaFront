import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import React from 'react'

type ApiKeySettingsProps = {
    onDelete?: () => void;
}
const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ onDelete }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                {onDelete && <Menu.Label>Danger zone</Menu.Label>}
                {
                    onDelete &&
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onDelete}>
                        Eliminar
                    </Menu.Item>
                }
            </Menu.Dropdown>
        </Menu>
    )
}

export { ApiKeySettings };