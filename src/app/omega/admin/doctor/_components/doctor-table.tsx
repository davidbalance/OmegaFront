import { Doctor } from '@/lib/dtos/user/doctor/base.response.dto'
import { MenuDivider, MenuItem, MenuLabel, rem, TableTbody, TableTd, TableTr } from '@mantine/core';
import { IconBuilding, IconLock, IconEye, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import UserActionMenu from '../../user/_components/user-action-menu';
import ActionUserProvider from '../../../../../contexts/action-user.context';

interface DoctorTableProps {
    doctors: Doctor[];
}
const DoctorTable: React.FC<DoctorTableProps> = ({ doctors }) => {
    return (
        <TableTbody>
            {doctors.map(e => (
                <TableTr key={e.id}>
                    <TableTd>{e.dni}</TableTd>
                    <TableTd>{e.name}</TableTd>
                    <TableTd>{e.lastname}</TableTd>
                    <TableTd>{e.email}</TableTd>
                    <TableTd>
                        <ActionUserProvider>
                            <UserActionMenu>
                                <MenuLabel>Aplicacion</MenuLabel>
                                {!e.hasCredential && <MenuItem
                                    component={Link}
                                    href={`doctor/action/${e.user}/credential`}
                                    leftSection={(
                                        <IconLock style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Asignar credenciales
                                </MenuItem>}
                                {e.hasFile && <MenuItem
                                    component={Link}
                                    href={`doctor/action/${e.id}/signature/view`}
                                    leftSection={(
                                        <IconEye style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Visualizar firma
                                </MenuItem>}
                                <MenuItem
                                    component={Link}
                                    href={`doctor/action/${e.id}/signature/upload`}
                                    leftSection={(
                                        <IconUpload style={{ width: rem(16), height: rem(16) }} />
                                    )}>

                                    Cargar firma
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href={`doctor/action/${e.user}/company`}
                                    leftSection={(
                                        <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Asignar Empresa
                                </MenuItem>
                            </UserActionMenu>
                        </ActionUserProvider>
                    </TableTd>
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default DoctorTable