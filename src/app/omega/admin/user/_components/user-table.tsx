import React from 'react'
import Link from 'next/link'
import { MenuDivider, MenuItem, MenuLabel, rem, TableTbody, TableTd, TableTr } from '@mantine/core'
import { IconBuilding, IconKey, IconPencil, IconSitemap, IconTrash } from '@tabler/icons-react'
import ActionMenu from '@/components/_base/action-menu'
import { User } from '@/lib/dtos/user/user/base.response.dto'

interface UserTableProps {
    users: User[]
}
const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <TableTbody>
            {users.map(e => (
                <TableTr key={e.id}>
                    <TableTd>{e.dni}</TableTd>
                    <TableTd>{e.name}</TableTd>
                    <TableTd>{e.lastname}</TableTd>
                    <TableTd>{e.email}</TableTd>
                    <TableTd>
                        <ActionMenu>
                            <MenuLabel>Aplicacion</MenuLabel>
                            <MenuItem
                                component={Link}
                                href={`user/action/${e.id}/update`}
                                leftSection={(
                                    <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Modificacion
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                href={`user/action/${e.id}/access`}
                                leftSection={(
                                    <IconSitemap style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Asignar pagina
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                href={`user/action/${e.id}/company`}
                                leftSection={(
                                    <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Asignar Empresa
                            </MenuItem>
                            <MenuDivider />
                            <MenuLabel>Danger zone</MenuLabel>
                            <MenuItem
                                component={Link}
                                href={`user/action/${e.id}/password`}
                                color="red"
                                leftSection={(
                                    <IconKey style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Generar contraseña
                            </MenuItem>
                            <MenuItem
                                color="red"
                                leftSection={(
                                    <IconTrash style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Eliminar
                            </MenuItem>
                        </ActionMenu>
                    </TableTd>
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default UserTable