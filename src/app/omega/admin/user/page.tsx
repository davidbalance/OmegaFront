import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Button, Flex, rem, TableTr, Text, Title } from '@mantine/core'
import React, { Suspense } from 'react'
import Search from '@/components/_base/search'
import UserTable from './_components/user-table'
import Await from '@/components/_base/await'
import UserTableSuspense from './_components/user-table.suspense'
import { retriveUsers } from './_actions/user.actions'
import Link from 'next/link'
import TableRoot from '@/components/_base/table/table-root'
import TableTHead from '@/components/_base/table/table-thead'
import TableTh from '@/components/_base/table/table-th'
import OrderableButton from '@/components/_base/orderable-button'

interface UserPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const UserPage: React.FC<UserPageProps> = ({ searchParams }) => {

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const userPromise = retriveUsers();

    return <>
        <ModularBox>
            <Box style={{ flexShrink: 0 }}>
                <Title order={4} component='span'>Usuarios</Title>
            </Box>
        </ModularBox>
        <ModularBox>
            <Flex
                justify='space-between'
                wrap='nowrap'
                gap={rem(16)}>
                <Search value={search} />
                <Button
                    component={Link}
                    radius='md'
                    href={'user/action/create'}>
                    Crear usuario
                </Button>
            </Flex>
        </ModularBox>
        <ModularBox h='100%'>
            <TableRoot>
                <TableTHead>
                    <TableTr>
                        <TableTh>
                            <OrderableButton field='dni' order={order}>
                                <Text>Cedula</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='name' order={order}>
                                <Text>Nombre</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='lastname' order={order}>
                                <Text>Apellido</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='email' order={order}>
                                <Text>Correo Electronico</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <Text>Accion</Text>
                        </TableTh>
                    </TableTr>
                </TableTHead>
                <Suspense fallback={<UserTableSuspense />}>
                    <Await promise={userPromise}>
                        {(user) => (
                            <UserTable
                                users={user} />
                        )}
                    </Await>
                </Suspense>
            </TableRoot>
        </ModularBox>
    </>
}

export default UserPage