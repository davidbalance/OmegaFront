'use client'

import { Group, Table, Text, Center, rem, TextInput, ActionIcon, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import classes from './User.module.css';
import { IconCirclePlus, IconLicense, IconLock, IconSearch, IconUserCheck } from '@tabler/icons-react';
import { useTable } from '@/hooks/useTable';
import { useDisclosure } from '@mantine/hooks';
import { IConfigurationService, UserModel, UserViewConfiguration, UserViewService } from '@/services';
import UserDataForm from '@/components/user/user-data-form/UserDataForm';
import UserPasswordForm from '@/components/user/user-password-form/UserPasswordForm';
import UserRoleForm from '@/components/user/user-role-form/UserRoleForm';
import { UserStepProps } from '@/components/user';
import CreateUserFormDrawer from '@/components/user/create-user-form-drawer/CreateUserFormDrawer';
import UpdateUserFormDrawer from '@/components/user/update-user-form-drawer/UpdateUserFormDrawer';
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu';
import SortTh from '@/components/table/sort-th/SortTh';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import UpdateUserRoleFormDrawer from '@/components/user/update-user-role-form-drawer/UpdateUserRoleFormDrawer';
import ChangePasswordDrawer from '@/components/user/change-password-drawer/ChangePasswordDrawer';
import DeleteUserDialog from '@/components/user/delete-user-dialog/DeleteUserDialog';

type UserData = UserModel;

const User: React.FC = () => {

    const userViewService: IConfigurationService<UserViewConfiguration> = new UserViewService();

    const table = useTable<UserData>([], 50);

    const [steps, setSteps] = useState<UserStepProps[]>([]);
    const [roles, setRoles] = useState<any>([]);
    const [selected, setSelected] = useState<UserData>();

    const tableLoad = useDisclosure(true);
    const createUserDisclosure = useDisclosure(false);
    const modifyUserDisclosure = useDisclosure(false);
    const modifyPassDisclosure = useDisclosure(false);
    const modifyRoleDisclosure = useDisclosure(false);
    const deleteUserDisclosure = useDisclosure(false);

    useEffect(() => {
        loadConfiguration();
        return () => { }
    }, [])

    const loadConfiguration = async () => {
        try {
            tableLoad[1].open();
            const { roles, users } = await userViewService.initialConfiguration();
            setRoles(roles);
            const rows = users as unknown as UserData[];
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
                    onConfiguration={() => {
                        setSelected(row);
                        modifyRoleDisclosure[1].open();
                    }}
                    onChangePassword={() => {
                        setSelected(row);
                        modifyPassDisclosure[1].open();
                    }}
                    onDelete={() => {
                        setSelected(row);
                        deleteUserDisclosure[1].open();
                    }}
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

    const handleComplete = (id: number) => {
        table.removeRow('id', id);
    }

    const handleModification = (updatedUser: UserModel) => {
        table.replaceRow('id', updatedUser.id, updatedUser);
    }

    return (
        <>
            <CreateUserFormDrawer
                opened={createUserDisclosure[0]}
                close={createUserDisclosure[1].close}
                steps={steps}
            />
            <UpdateUserFormDrawer
                user={selected as any}
                opened={modifyUserDisclosure[0]}
                onClose={modifyUserDisclosure[1].close}
                onComplete={handleModification} />
            <UpdateUserRoleFormDrawer
                user={selected?.id || -1}
                roles={roles}
                opened={modifyRoleDisclosure[0]}
                onClose={modifyRoleDisclosure[1].close}
                onComplete={(roles) => {
                    if (selected) {
                        const data = selected;
                        data.roles = roles;
                        handleModification(data);
                    }
                }} />
            <ChangePasswordDrawer
                opened={modifyPassDisclosure[0]}
                onClose={modifyPassDisclosure[1].close}
            />
            <DeleteUserDialog
                user={selected?.id || -1}
                onComplete={handleComplete}
                opened={deleteUserDisclosure[0]}
                onClose={deleteUserDisclosure[1].close}
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