import { ActionColumnProps } from '@/components/layout/table-layout/TableLayout';
import { User } from '@/lib/dtos/user/user.response.dto';
import { Menu, MenuTarget, ActionIcon, rem, Flex } from '@mantine/core';
import { IconBuilding, IconDotsVertical, IconKey, IconPencil, IconSitemap, IconTrash } from '@tabler/icons-react';
import React from 'react'

interface UserActionButtonProps extends ActionColumnProps<User> {
    /**
     * Funcion que es invocada cuando se llama al evento de cambio de contraseña.
     * @returns 
     */
    onChangePassword?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de modificacion de recursos.
     * @returns 
     */
    onResourceChange?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de de asignacion de empresa.
     * @returns 
     */
    onLookForCompany?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de modificacion de usuario.
     * @returns 
     */
    onModification?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de eliminacion de usuario.
     * @returns 
     */
    onDelete?: () => void;
}
const UserActionButton: React.FC<UserActionButtonProps> = ({ onChangePassword, onResourceChange, onDelete, onModification, onLookForCompany }) => {

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
                {(onModification || onResourceChange || onLookForCompany) ? <Menu.Label>Aplicacion</Menu.Label> : <></>}
                {
                    onModification &&
                    <Menu.Item
                        leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onModification}>
                        Modificacion
                    </Menu.Item>
                }
                {onResourceChange &&
                    <Menu.Item
                        leftSection={<IconSitemap style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onResourceChange}>
                        Asignar pagina
                    </Menu.Item>
                }
                {onLookForCompany &&
                    <Menu.Item
                        leftSection={<IconBuilding style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onLookForCompany}>
                        Asignar Empresa
                    </Menu.Item>
                }

                {onDelete || onChangePassword
                    ? <>
                        <Menu.Divider />
                        <Menu.Label>Danger zone</Menu.Label>
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

export { UserActionButton }