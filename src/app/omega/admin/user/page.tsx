import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Button, Flex, rem, Title } from '@mantine/core'
import React, { Suspense } from 'react'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import Search from '@/components/_base/search'
import UserTable from './_components/user-table'
import Await from '@/components/_base/await'
import UserTableSuspense from './_components/user-table.suspense'
import { retriveUsers } from './_actions/user.actions'
import Link from 'next/link'

interface UserPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const UserPage: React.FC<UserPageProps> = ({ searchParams }) => {

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;
    // const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const userPromise = retriveUsers();

    return <>
        <ModularBox>
            <Box style={{ flexShrink: 0 }}>
                <Title order={4} component='span'>Usuarios</Title>
            </Box>
        </ModularBox>
        <ModularLayout>
            <ModularBox>
                <Flex
                    justify='space-between'
                    wrap='nowrap'
                    gap={rem(16)}>
                    <Search key='search' value={search} />
                    <Button
                        component={Link}
                        radius='md' 
                        href={'user/actions/create'}>
                        Crear usuario
                    </Button>
                </Flex>
            </ModularBox>
            <ModularBox h='100%'>
                <Suspense fallback={<UserTableSuspense order={{ order }} />}>
                    <Await promise={userPromise}>
                        {(user) => (
                            <UserTable
                                order={{ order: order }}
                                users={user} />
                        )}
                    </Await>
                </Suspense>
            </ModularBox>
        </ModularLayout>
    </>
}

export default UserPage