import { Doctor } from '@/lib/dtos/user/doctor/base.response.dto'
import { MenuItem, MenuLabel, rem, TableTbody, TableTd, TableTr } from '@mantine/core';
import { IconBuilding, IconLock, IconEye, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import ActionMenu from '@/components/_base/action-menu';
import ActionMenuProvider from '@/contexts/action-menu.context';

interface DoctorBodyProps {
    doctors: Doctor[];
}
const DoctorBody: React.FC<DoctorBodyProps> = ({ doctors }) => {
    return (
        <TableTbody>
            {doctors.map(e => (
                <TableTr key={e.id}>
                    <TableTd>{e.dni}</TableTd>
                    <TableTd>{e.name}</TableTd>
                    <TableTd>{e.lastname}</TableTd>
                    <TableTd>{e.email}</TableTd>
                    <TableTd>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Aplicacion</MenuLabel>
                                {!e.hasCredential && (
                                    <MenuItem
                                        component={Link}
                                        href={`doctor/${e.user}/credential`}
                                        leftSection={(
                                            <IconLock style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Asignar credenciales
                                    </MenuItem>
                                )}
                                {Boolean(e.hasFile) && (
                                    <MenuItem
                                        component={Link}
                                        href={`doctor/${e.id}/signature/view`}
                                        leftSection={(
                                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Visualizar firma
                                    </MenuItem>
                                )}
                                <MenuItem
                                    component={Link}
                                    href={`doctor/${e.id}/signature/upload`}
                                    leftSection={(
                                        <IconUpload style={{ width: rem(16), height: rem(16) }} />
                                    )}>

                                    Cargar firma
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href={`doctor/${e.user}/company`}
                                    leftSection={(
                                        <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Asignar Empresa
                                </MenuItem>
                            </ActionMenu>
                        </ActionMenuProvider>
                    </TableTd>
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default DoctorBody