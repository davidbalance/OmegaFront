import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconSettings, IconKey, IconTrash } from '@tabler/icons-react'
import React from 'react'

type RoleSettingsMenuProps = {
    onModification?: () => void;
    onDelete?: () => void;
    onConfiguration?: () => void;
}
const RoleSettingsMenu: React.FC<RoleSettingsMenuProps> = ({ onModification, onDelete }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                {onModification ? <Menu.Label>Aplicacion</Menu.Label> : <></>}
                {
                    onModification &&
                    <Menu.Item
                        leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onModification}>
                        Modificacion
                    </Menu.Item>
                }

                {onDelete
                    ? <>
                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Divider />
                    </>
                    : <></>
                }
                {onDelete &&
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

export default RoleSettingsMenu