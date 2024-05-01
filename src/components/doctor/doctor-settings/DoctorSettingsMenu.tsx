import { ActionIcon, Menu, MenuTarget, rem } from '@mantine/core'
import { IconDotsVertical, IconLock, IconUpload } from '@tabler/icons-react'
import React from 'react'

type DoctorSettingsProps = {
    onCreateCredential?: () => void;
    onUploadSignature: () => void;
}
const DoctorSettings: React.FC<DoctorSettingsProps> = ({ onCreateCredential, onUploadSignature }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Label>Aplicacion</Menu.Label>
                {onCreateCredential && <Menu.Item
                    leftSection={<IconLock style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onCreateCredential}>
                    Asignar credenciales
                </Menu.Item>}
                <Menu.Item
                    leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onUploadSignature}>
                    Cargar firma
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { DoctorSettings }