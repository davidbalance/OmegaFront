import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface DiseaseGroupActionMenuProps {
    onModification: () => void;
    onDelete: () => void;
}
const DiseaseGroupActionMenu: React.FC<DiseaseGroupActionMenuProps> = ({ onModification, onDelete }) => {

    const handleClickEventModification = useCallback(() => onModification(), [onModification]);
    const handleClickEventDelete = useCallback(() => onDelete(), [onDelete]);

    return (
        <Menu withArrow>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={handleClickEventModification}
                    leftSection={<IconEdit style={{ width: rem(16), height: rem(16) }} />}
                >
                    Editar grupo
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    onClick={handleClickEventDelete}
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} />}
                >
                    Eliminar grupo
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default DiseaseGroupActionMenu