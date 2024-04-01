import { ActionIcon, Menu, MenuTarget, rem } from '@mantine/core'
import { IconDotsVertical, IconLock } from '@tabler/icons-react'
import React from 'react'

type DoctorSettingsMenuProps = {
    onAssignCredential: () => void;
}
const DoctorSettingsMenu: React.FC<DoctorSettingsMenuProps> = ({ onAssignCredential }) => {
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
                    leftSection={<IconLock style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onAssignCredential}>
                    Asignar credenciales
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default DoctorSettingsMenu