import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Button, Center, Flex, Group, rem, ScrollAreaAutosize, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import clsx from 'clsx'
import classes from './user.module.css'
import { IconSelector } from '@tabler/icons-react'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Search } from '@/components/_base/Search'
import ServerPagination from '@/components/_base/ServerPagination'

interface UserPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const UserPage: React.FC<UserPageProps> = ({ searchParams }) => {

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    return <>
        <ModularBox>
            <Box style={{ flexShrink: 0 }}>
                <Title order={4} component='span'>Usuarios</Title>
            </Box>
        </ModularBox>
        <ModularLayout>
            {/* Custom provider start */}
            <ModularBox>
                <Flex
                    justify='space-between'
                    wrap='nowrap'
                    gap={rem(16)}>
                    <Search key='search' value={search} />
                    <Button radius='md'>Crear usuario</Button>
                </Flex>
            </ModularBox>
            <ModularBox h='100%'>
                <Stack
                    align='stretch'
                    gap={rem(8)}
                    h='100%'
                    justify='flex-start'>
                    <Box mah='100%' mb='auto'>
                        <ScrollAreaAutosize mah='450px' mx="-xs" px="xs" >
                            <Table>
                                <TableThead className={clsx(classes.header, { [classes.scrolled]: false })}>
                                    <TableTr>
                                        <TableTh>
                                            <UnstyledButton>
                                                <Group>
                                                    <Text fw={500} fz='sm'>
                                                        Name
                                                    </Text>
                                                    <Center>
                                                        <IconSelector style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                                    </Center>
                                                </Group>
                                            </UnstyledButton>
                                        </TableTh>
                                        <TableTh>Email</TableTh>
                                        <TableTh>Company</TableTh>
                                    </TableTr>
                                </TableThead>
                                <TableTbody>
                                    <TableTr>
                                        <TableTd>rowname</TableTd>
                                        <TableTd>rowemail</TableTd>
                                        <TableTd>rowcompany</TableTd>
                                    </TableTr>
                                </TableTbody>
                            </Table>
                        </ScrollAreaAutosize>
                    </Box>
                    <Box>
                        <ServerPagination
                            page={page}
                            total={10} />
                    </Box>
                </Stack>
            </ModularBox>
            {/* Custom provider end */}
        </ModularLayout>
    </>
}

export default UserPage