import React from 'react'

import TableRoot from '@/components/_base/table/table-root'
import TableTHead from '@/components/_base/table/table-thead'
import TableOrderableTh, { TableOrderableThProps } from '@/components/_base/table/table-orderable-th'
import TableTh from '@/components/_base/table/table-th'
import { rem, Skeleton, TableTbody, TableTd, TableTr, Text } from '@mantine/core'

interface UserTableSuspenseProps {
    order?: Omit<TableOrderableThProps, | 'children' | 'field'>;
}
const UserTableSuspense: React.FC<UserTableSuspenseProps> = ({ order }) => {
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
                {[...Array(10)].map(e => (
                    <TableTr key={Math.random()}>
                        <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                        <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                        <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                        <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                        <TableTd><Skeleton circle height={rem(15)} /></TableTd>
                    </TableTr>
                ))}
            </TableTbody>
        </TableRoot>
    )
}

export default UserTableSuspense