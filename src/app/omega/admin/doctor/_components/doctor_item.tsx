import { MenuItem, MenuLabel, rem, TableTd, TableTr } from '@mantine/core';
import { IconLock, IconEye, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import ActionMenu from '@/components/_base/action-menu';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Doctor } from '@/server/doctor/server_types';

type DoctorItemProps = Doctor;
const DoctorItem: React.FC<DoctorItemProps> = ({
    userId,
    userName,
    userLastname,
    userDni,
    userEmail,
    doctorHasFile,
    userHasAuth
}) => {
    return (
        <TableTr key={userId}>
            <TableTd>{userDni}</TableTd>
            <TableTd>{userName}</TableTd>
            <TableTd>{userLastname}</TableTd>
            <TableTd>{userEmail}</TableTd>
            <TableTd>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Aplicacion</MenuLabel>
                        {!userHasAuth && (
                            <MenuItem
                                component={Link}
                                href={`doctor/${userId}/credential`}
                                leftSection={(
                                    <IconLock style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Asignar credenciales
                            </MenuItem>)}
                        {doctorHasFile && (
                            <MenuItem
                                component={Link}
                                href={`doctor/${userId}/signature/view`}
                                leftSection={(
                                    <IconEye style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Visualizar firma
                            </MenuItem>)}
                        <MenuItem
                            component={Link}
                            href={`doctor/${userId}/signature/upload`}
                            leftSection={(
                                <IconUpload style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Cargar firma
                        </MenuItem>
                    </ActionMenu>
                </ActionMenuProvider>
            </TableTd>
        </TableTr>
    )
}

export default DoctorItem