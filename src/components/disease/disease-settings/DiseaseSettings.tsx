import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconPdf, IconTrash } from '@tabler/icons-react';
import React from 'react'

type DiseaseSettingsProps = {
    onModification: () => void;
    onDelete: () => void;
}
const DiseaseSettings: React.FC<DiseaseSettingsProps> = ({ onDelete, onModification }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Label>Morbilidad</Menu.Label>
                <Menu.Item
                    leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onModification}>
                    Modificar morbilidad
                </Menu.Item>
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    onClick={onDelete}>
                    Eliminar
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { DiseaseSettings }