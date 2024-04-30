import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconPdf } from '@tabler/icons-react'
import React from 'react'

type MedicalResultSettingsProps = {
    onCreate: () => void;
    onDownload?: () => void;
}
const MedicalResultSettings: React.FC<MedicalResultSettingsProps> = ({ onCreate, onDownload }) => {
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
                    onClick={onCreate}>
                    Elaborar reporte
                </Menu.Item>
                {
                    onDownload && <Menu.Item
                        leftSection={<IconPdf style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onDownload}>
                        Descargar reporte
                    </Menu.Item>}
            </Menu.Dropdown>
        </Menu>
    )
}

export { MedicalResultSettings };