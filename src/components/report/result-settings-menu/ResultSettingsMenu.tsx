import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconSettings, IconKey, IconTrash } from '@tabler/icons-react'
import React from 'react'

type ResultSettingsMenuProps = {
    onCreateClick: () => void;
}
const ResultSettingsMenu: React.FC<ResultSettingsMenuProps> = ({ onCreateClick }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Label>Accion Medica</Menu.Label>
                <Menu.Item
                    leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onCreateClick}>
                    Elaborar reporte
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ResultSettingsMenu