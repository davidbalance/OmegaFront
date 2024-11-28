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
import { countUser, searchUser } from '@/server/user.actions'

const take: number = 100;
interface UserPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const UserPage: React.FC<UserPageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const users = await searchUser({ search: search, field: field, page: page - 1, take: take, order: order as any });
    const pages = await countUser({ search: search, take: take });

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
                            <OrderableButton field='dni'>
                                <Text>Cedula</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='name'>
                                <Text>Nombre</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='lastname'>
                                <Text>Apellido</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <OrderableButton field='email'>
                                <Text>Correo Electronico</Text>
                            </OrderableButton>
                        </TableTh>
                        <TableTh>
                            <Text>Accion</Text>
                        </TableTh>
                    </TableTr>
                </TableTHead>
                <UserBody users={users} />
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