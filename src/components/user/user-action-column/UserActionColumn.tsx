import { ActionColumnProps } from '@/components/layout/table-layout/TableLayout';
import { User } from '@/services/api/user/dtos';
import { Menu, MenuTarget, ActionIcon, rem, Flex } from '@mantine/core';
import { IconDotsVertical, IconKey, IconPencil, IconSettings, IconTrash } from '@tabler/icons-react';
import React from 'react'

interface UserActionColumnProps extends ActionColumnProps<User> {
    onChangePassword?: () => void;
    onConfiguration?: () => void;
    onModification?: () => void;
    onDelete?: () => void;
}
const UserActionColumn: React.FC<UserActionColumnProps> = ({ value, onChangePassword, onConfiguration, onDelete, onModification }) => {

    return (
        <Menu>
            <MenuTarget>
                <Flex justify='center'>
                    <ActionIcon variant="transparent">
                        <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Flex>
            </MenuTarget>
            <Menu.Dropdown>
                {onModification || onConfiguration ? <Menu.Label>Aplicacion</Menu.Label> : <></>}
                {
                    onModification &&
                    <Menu.Item
                        leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onModification}>
                        Modificacion
                    </Menu.Item>
                }
                {onConfiguration &&
                    <Menu.Item
                        leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onConfiguration}>
                        Configuracion
                    </Menu.Item>
                }

                {onDelete || onChangePassword
                    ? <>
                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Divider />
                    </>
                    : <></>
                }
                {onChangePassword &&
                    <Menu.Item
                        color="red"
                        leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onChangePassword}>
                        Generar contraseña
                    </Menu.Item>
                }
                {onDelete &&
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onDelete}>
                        Eliminar
                    </Menu.Item>
                }
            </Menu.Dropdown>
        </Menu>
    )
}

export { UserActionColumn }