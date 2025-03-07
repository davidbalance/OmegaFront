import React from 'react'
import Link from 'next/link'
import { MenuDivider, MenuItem, MenuLabel, rem, TableTbody, TableTd, TableTr } from '@mantine/core'
import { IconBuilding, IconKey, IconPencil, IconSitemap } from '@tabler/icons-react'
import UserActionDelete from './user-action-delete'
import ActionUserProvider from '../../../../../contexts/action-menu.context'
import ActionMenu from '@/components/_base/action-menu'
import { User } from '@/server/user/server_types'

interface UserBodyProps {
    users: User[]
}
const UserBody: React.FC<UserBodyProps> = ({ users }) => {
    return (
        <TableTbody>
            {users.map(e => (
                <TableTr key={e.userId}>
                    <TableTd>{e.userDni}</TableTd>
                    <TableTd>{e.userName}</TableTd>
                    <TableTd>{e.userLastname}</TableTd>
                    <TableTd>{e.userEmail}</TableTd>
                    <TableTd>
                        <ActionUserProvider>
                            <ActionMenu>
                                <MenuLabel>Aplicacion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`user/${e.userId}/update`}
                                    leftSection={(
                                        <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Modificacion
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href={`user/${e.userId}/resource`}
                                    leftSection={(
                                        <IconSitemap style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Asignar paginas
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href={`user/${e.userId}/company`}
                                    leftSection={(
                                        <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Asignar empresa
                                </MenuItem>
                                <MenuDivider />
                                <MenuLabel>Danger zone</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`user/${e.userId}/password`}
                                    color="red"
                                    leftSection={(
                                        <IconKey style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Generar contraseña
                                </MenuItem>
                                <UserActionDelete id={e.userId} />
                            </ActionMenu>
                        </ActionUserProvider>
                    </TableTd>
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default UserBody