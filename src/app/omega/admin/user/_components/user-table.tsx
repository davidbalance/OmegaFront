import React from 'react'
import { User } from '@/lib/dtos/user/user/base.response.dto'

import TableRoot from '@/components/_base/table/table-root'
import TableTHead from '@/components/_base/table/table-thead'
import TableOrderableTh, { TableOrderableThProps } from '@/components/_base/table/table-orderable-th'
import TableTh from '@/components/_base/table/table-th'
import { TableTbody, TableTd, TableTr, Text } from '@mantine/core'

interface UserTableProps {
    users: User[]
    order?: Omit<TableOrderableThProps, | 'children' | 'field'>;
}
const UserTable: React.FC<UserTableProps> = ({ users, order }) => {
    return (
        <TableRoot>
            <TableTHead>
                <TableOrderableTh field='dni' {...order}>
                    <Text>Cedula</Text>
                </TableOrderableTh>
                <TableOrderableTh field='name' {...order}>
                    <Text>Nombre</Text>
                </TableOrderableTh>
                <TableOrderableTh field='lastname' {...order}>
                    <Text>Apellido</Text>
                </TableOrderableTh>
                <TableOrderableTh field='email' {...order}>
                    <Text>Correo Electronico</Text>
                </TableOrderableTh>
                <TableTh>
                    <Text>Accion</Text>
                </TableTh>
            </TableTHead>
            <TableTbody>
                {users.map(e => (
                    <TableTr key={e.id}>
                        <TableTd>{e.dni}</TableTd>
                        <TableTd>{e.name}</TableTd>
                        <TableTd>{e.lastname}</TableTd>
                        <TableTd>{e.email}</TableTd>
                        <TableTd>Action</TableTd>
                    </TableTr>
                ))}
            </TableTbody>
        </TableRoot>
    )
}

export default UserTable