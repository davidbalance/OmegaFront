'use client'

import { Group, Table, UnstyledButton, Text, Center, rem, ScrollArea, TextInput, Pagination, ActionIcon, Flex, Title, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import classes from './User.module.css';
import { IconChevronDown, IconChevronUp, IconCirclePlus, IconLicense, IconLock, IconSearch, IconSelector, IconUserCheck } from '@tabler/icons-react';
import cx from 'clsx';
import { useTable } from '@/hooks/useTable';
import { useDisclosure } from '@mantine/hooks';
import { UserViewService } from '@/services';
import UserDataForm from '@/components/user/user-data-form/UserDataForm';
import UserPasswordForm from '@/components/user/user-password-form/UserPasswordForm';
import UserRoleForm from '@/components/user/user-role-form/UserRoleForm';
import { UserStepProps } from '@/components/user';
import CreateUserFormDrawer from '@/components/user/create-user-form/CreateUserForm';
import UpdateUserFormDrawer from '@/components/user/update-user-form/UpdateUserFormDrawer';
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu';
import SortTh from '@/components/table/sort-th/SortTh';
import OmegaTable from '@/components/table/omega-table/OmegaTable';

interface RowData {
    id: number;
    dni: string;
    name: string;
    email: string;
    lastname: string;
}

const User: React.FC = () => {

    const userViewService: UserViewService = new UserViewService();

    const table = useTable<RowData>([], 50);

    const [selected, setSelected] = useState<RowData>();


    const tableLoad = useDisclosure(true);
    const createUserDisclosure = useDisclosure(false);
    const modifyUserDisclosure = useDisclosure(false);
    const [steps, setSteps] = useState<UserStepProps[]>([]);

    useEffect(() => {
        loadConfiguration();
        return () => { }
    }, [])

    const loadConfiguration = async () => {
        try {
            tableLoad[1].open();
            const { roles, users } = await userViewService.initialConfiguration();
            const rows = users as unknown as RowData[];
            table.setData(rows);
            setSteps([
                {
                    description: 'Datos del usuario',
                    icon: <IconUserCheck style={{ width: rem(18), height: rem(18) }} />,
                    step: {
                        form: UserDataForm,
                        props: {}
                    }
                },
                {
                    description: 'Creacion de contraseña',
                    icon: <IconLock style={{ width: rem(18), height: rem(18) }} />,
                    step: {
                        form: UserPasswordForm,
                        props: {}
                    },
                },
                {
                    description: 'Creacion de contraseña',
                    icon: <IconLicense style={{ width: rem(18), height: rem(18) }} />,
                    step: {
                        form: UserRoleForm,
                        props: {
                            roles: roles
                        }
                    },
                }
            ]);
        } catch (error) {

        } finally {
            tableLoad[1].close();
        }
    }

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.dni}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.lastname}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>
                <UserSettingsMenu
                    onModification={() => {
                        setSelected(row);
                        modifyUserDisclosure[1].open();
                    }}
                    onConfiguration={() => { }}
                    onDelete={() => { }}
                />
            </Table.Td>
        </Table.Tr>
    ));

    const header = <>
        <SortTh sorted={table.sortBy === 'dni'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('dni')} >CI</SortTh>
        <SortTh sorted={table.sortBy === 'name'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('name')}>Nombre</SortTh>
        <SortTh sorted={table.sortBy === 'lastname'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('lastname')}>Apellido</SortTh>
        <SortTh sorted={table.sortBy === 'email'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('email')}>Correo Electronico</SortTh>
        <Table.Th className={classes.th}>Acciones</Table.Th>
    </>

    return (
        <>
            <CreateUserFormDrawer
                opened={createUserDisclosure[0]}
                close={createUserDisclosure[1].close}
                steps={steps}
            />
            <UpdateUserFormDrawer
                user={selected}
                opened={modifyUserDisclosure[0]}
                close={modifyUserDisclosure[1].close}
            />
            <Group justify="space-between">
                <Text fw={500} fz="sm">
                    <Title component="span" variant="text" c='omegaColors'>
                        Usuarios
                    </Title>
                </Text>
                {
                    steps.length && <Center className={classes.icon}>
                        <ActionIcon
                            variant="transparent"
                            onClick={createUserDisclosure[1].open}
                        >
                            <IconCirclePlus
                                style={{ width: rem(64), height: rem(64) }}
                                stroke={1.5} />
                        </ActionIcon>
                    </Center>
                }
            </Group>

            <br />

            <TextInput
                placeholder="Busca cualquier campo"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={table.search}
                onChange={table.onSeach}
            />
            <OmegaTable
                loading={tableLoad[0]}
                header={header}
                rows={rows}
                total={table.total}
                page={table.activePage}
                onPageChange={table.setPage} />
        </>
    );
}

export default User