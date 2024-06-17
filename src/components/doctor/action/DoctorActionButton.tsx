import { ActionColumnProps } from '@/components/layout/table-layout/TableLayout';
import { Doctor } from '@/lib/dtos/user/doctor.response.dto';
import { Menu, MenuTarget, ActionIcon, rem, Flex } from '@mantine/core';
import { IconDotsVertical, IconKey, IconLock, IconPencil, IconSettings, IconTrash, IconUpload } from '@tabler/icons-react';
import React from 'react'

interface DoctorActionButtonProps extends ActionColumnProps<Doctor> {
    onCreateCredential?: () => void;
    onUploadSignature: () => void;
}
const DoctorActionButton: React.FC<DoctorActionButtonProps> = ({ onCreateCredential, onUploadSignature }) => {

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

export { DoctorActionButton }