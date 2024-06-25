import { ActionIcon, Menu, MenuTarget, rem } from '@mantine/core'
import { IconBuilding, IconDotsVertical, IconLock, IconUpload } from '@tabler/icons-react'
import React from 'react'

type DoctorActionMenuProps = {
    onUploadSignature: () => void;
    onAssignCompany: () => void;
    createCredential?: boolean;
    onCreateCredential?: () => void;
}
const DoctorActionMenu: React.FC<DoctorActionMenuProps> = ({ createCredential, onCreateCredential, onUploadSignature, onAssignCompany }) => {
    if (createCredential && !onCreateCredential) {
        throw new Error('Set a onCreateCredential event');
    }
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Label>Aplicacion</Menu.Label>
                {createCredential && <Menu.Item
                    leftSection={<IconLock style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onCreateCredential}>
                    Asignar credenciales
                </Menu.Item>}
                <Menu.Item
                    leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onUploadSignature}>
                    Cargar firma
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconBuilding style={{ width: rem(16), height: rem(16) }} />}
                    onClick={onAssignCompany}>
                    Asignar Empresa
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { DoctorActionMenu }