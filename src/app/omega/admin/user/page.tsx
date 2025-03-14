import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Button, Flex, rem, TableTr, Text, Title } from '@mantine/core'
import React from 'react'
import Search from '@/components/_base/search'
import UserBody from './_components/user-table'
import Link from 'next/link'
import TableRoot from '@/components/_base/table/table-root'
import TableTHead from '@/components/_base/table/table-thead'
import TableTh from '@/components/_base/table/table-th'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import ServerPagination from '@/components/_base/server-pagination'
import { retriveUsers } from '@/server/user/actions'

const take: number = 100;
interface UserPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const UserPage: React.FC<UserPageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const value = await retriveUsers({
        filter: search,
        skip: page - 1,
        limit: take,
        orderField: field as any,
        orderValue: orderingValue as any
    });
    const pages = Math.floor(value.amount / take);

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
                <Search
                    value={search}
                    removeQueries={['field', 'order', 'page']} />
                <Button
                    component={Link}
                    radius='md'
                    href={'user/create'}>
                    Crear usuario
                </Button>
            </Flex>
        </ModularBox>
        <ModularBox flex={1}>
            <TableRoot>
                <TableTHead>
                    <TableTr>
                        <TableTh>
                            <OrderableButton field='userDni'>
                                <Text>Cedula</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='userName'>
                                <Text>Nombre</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='userLastname'>
                                <Text>Apellido</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='userEmail'>
                                <Text>Correo Electronico</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <Text>Accion</Text>
                        </TableTh>
                    </TableTr>
                </TableTHead>
                <UserBody users={value.data} />
            </TableRoot>
        </ModularBox>
        {pages > 1 && (
            <ModularBox>
                <ServerPagination
                    page={page}
                    total={pages} />
            </ModularBox>)}
    </>
}

export default UserPage