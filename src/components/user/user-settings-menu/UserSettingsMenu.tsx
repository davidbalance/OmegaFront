import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconSettings, IconKey, IconTrash } from '@tabler/icons-react';
import React from 'react'

type UserSettingsMenuProps = { onConfiguration: () => void, onModification: () => void, onDelete: () => void };
const UserSettingsMenu: React.FC<UserSettingsMenuProps> = ({ onConfiguration, onDelete, onModification }) => {

    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Label>Aplicacion</Menu.Label>
                <Menu.Item
                    leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onModification}>
                    Modificacion
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onConfiguration}>
                    Configuracion
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    leftSection={<IconKey style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onConfiguration}>
                    Generar contraseña
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onDelete}
                >
                    Eliminar
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default UserSettingsMenu