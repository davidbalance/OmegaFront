'use client'

import { Group, Table, Center, rem, TextInput, ActionIcon, Title } from '@mantine/core';
import React, { useLayoutEffect, useState } from 'react'
import { IconCirclePlus, IconLicense, IconLock, IconSearch, IconUserCheck } from '@tabler/icons-react';
import { useTable } from '@/hooks/useTable';
import { useDisclosure } from '@mantine/hooks';
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
import { Role, User, User as UserType } from '@/lib';
import { IFindService, RoleService, UserService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';

const stepDataForm: UserStepProps = {
    description: 'Datos del usuario',
    icon: <IconUserCheck style={{ width: rem(18), height: rem(18) }} />,
    step: { form: UserDataForm, props: {} }
};
const stepPasswordForm: UserStepProps = {
    description: 'Creacion de contraseña',
    icon: <IconLock style={{ width: rem(18), height: rem(18) }} />,
    step: { form: UserPasswordForm, props: {} }
};
const stepRoleForm = (roles: Role[]): UserStepProps => ({
    description: 'Asignacion de roles',
    icon: <IconLicense style={{ width: rem(18), height: rem(18) }} />,
    step: {
        form: UserRoleForm,
        props: {
            roles: roles
        }
    },
});

const User: React.FC = () => {

    const userService: IFindService<any, User> = new UserService(endpoints.USER.V1);
    const roleService: IFindService<any, Role> = new RoleService(endpoints.ROLE.V1);

    const table = useTable<UserType>([], 50);

    const [steps, setSteps] = useState<UserStepProps[]>([]);
    const [selected, setSelected] = useState<UserType>();
    const [roles, setRoles] = useState<Role[]>([]);

    const [tableLoading, tableDisclosure] = useDisclosure(true);

    const [openCreateForm, createFormDisclosure] = useDisclosure(false);
    const [openModifyForm, modifyFormDisclosure] = useDisclosure(false);
    const [openDeleteForm, deleteFormDisclosure] = useDisclosure(false);

    const [openRoleForm, roleFormDisclosure] = useDisclosure(false);
    const [openPasswordForm, passwordFormDisclosure] = useDisclosure(false);

    useLayoutEffect(() => {
        load();
        return () => { }
    }, []);

    const load = async () => {
        tableDisclosure.open();
        try {
            const users = await userService.find();
            const roles = await roleService.find();
            table.setData(users);
            setRoles(roles);
            setSteps([stepDataForm, stepPasswordForm, stepRoleForm(roles)]);
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error',
                message: 'Ha ocurrido un error al obtener lo datos del servidor',
                color: 'red'
            });
        } finally {
            tableDisclosure.close();
        }
    }

    const onModification = (user: User) => { setSelected(user); modifyFormDisclosure.open() };
    const onConfiguration = (user: User) => { setSelected(user); roleFormDisclosure.open() };
    const onChangePassword = (user: User) => { setSelected(user); passwordFormDisclosure.open() };
    const onDelete = (user: User) => { setSelected(user); deleteFormDisclosure.open() };

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.dni}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.lastname}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>
                <UserSettingsMenu
                    onModification={() => onModification(row)}
                    onConfiguration={() => onConfiguration(row)}
                    onChangePassword={() => onChangePassword(row)}
                    onDelete={() => onDelete(row)}
                />
            </Table.Td>
        </Table.Tr>
    ));

    const header = <>
        <SortTh sorted={table.sortBy === 'dni'} reversed={table.sortDirection} onSort={() => table.setSorting('dni')} >CI</SortTh>
        <SortTh sorted={table.sortBy === 'name'} reversed={table.sortDirection} onSort={() => table.setSorting('name')}>Nombre</SortTh>
        <SortTh sorted={table.sortBy === 'lastname'} reversed={table.sortDirection} onSort={() => table.setSorting('lastname')}>Apellido</SortTh>
        <SortTh sorted={table.sortBy === 'email'} reversed={table.sortDirection} onSort={() => table.setSorting('email')}>Correo Electronico</SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    return (
        <>
            <CreateUserFormDrawer opened={openCreateForm} onClose={createFormDisclosure.close} steps={steps} onComplete={() => load()} />
            <UpdateUserFormDrawer opened={openModifyForm} onClose={modifyFormDisclosure.close} user={selected!} />
            <UpdateUserRoleFormDrawer opened={openRoleForm} onClose={roleFormDisclosure.close} roles={roles} user={selected?.id || -1} />
            <ChangePasswordDrawer opened={openPasswordForm} onClose={passwordFormDisclosure.close} email={selected ? selected.email : ''} />
            <DeleteUserDialog opened={openDeleteForm} onClose={deleteFormDisclosure.close} user={selected?.id || -1} onComplete={() => load()}/>

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Usuarios
                </Title>
                {
                    steps.length &&
                    <Center>
                        <ActionIcon
                            variant="transparent"
                            onClick={createFormDisclosure.open}>
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
                loading={tableLoading}
                header={header}
                rows={rows}
                total={table.total}
                page={table.page}
                onPageChange={table.setPage} />
        </>
    );
}

export default User