import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconPdf } from '@tabler/icons-react'
import React from 'react'

type ResultSettingsMenuProps = {
    useFile: boolean;
    onCreateClick: () => void;
    onDownloadReportPDF: () => void;
}
const ResultSettingsMenu: React.FC<ResultSettingsMenuProps> = ({ useFile, onCreateClick, onDownloadReportPDF }) => {
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
                {
                    useFile && <Menu.Item
                        leftSection={<IconPdf style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onDownloadReportPDF}>
                        Descargar reporte
                    </Menu.Item>}
            </Menu.Dropdown>
        </Menu>
    )
}

export default ResultSettingsMenu