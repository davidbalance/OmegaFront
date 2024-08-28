import { InputSearch } from '@/components/input/search/InputSearch'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Button, Center, Flex, Group, Pagination, rem, ScrollAreaAutosize, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import clsx from 'clsx'
import classes from './user.module.css'
import { IconSelector } from '@tabler/icons-react'
import ModularLayout from '@/components/modular/layout/ModularLayout'

const UserPage: React.FC = () => {
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
                    <InputSearch
                        w='100%'
                        placeholder="Buscar" />
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
                        <Flex justify='center'>
                            <Pagination
                                total={10}
                                radius='xl'
                                withEdges
                                size='sm' />
                        </Flex>
                    </Box>
                </Stack>
            </ModularBox>
            {/* Custom provider end */}
        </ModularLayout>
    </>
}

export default UserPage