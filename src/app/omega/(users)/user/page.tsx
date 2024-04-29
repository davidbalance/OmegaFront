'use client'

import { Group, Table, Center, rem, TextInput, ActionIcon, Text, Tooltip } from '@mantine/core';
import React, { useLayoutEffect, useState } from 'react'
import { IconCirclePlus, IconLicense, IconLock, IconSearch, IconUserCheck } from '@tabler/icons-react';
import { useTable } from '@/hooks/useTable';
import { useDisclosure } from '@mantine/hooks';
import UserDataForm from '@/components/user/user-data-form/UserDataForm';
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu';
import { OmegaTable } from '@/components/table/omega-table/OmegaTable';
import DeleteUserDialog from '@/components/user/delete-user-dialog/DeleteUserDialog';
import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';
import { IFindService } from '@/services/interfaces';
import { User as UserType } from '@/services/api/user/dtos';
import { Role as RoleType } from '@/services/api/role/dtos';
import { RoleService, UserService } from '@/services/api';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { CreateUserForm, UserStepProps } from '@/components/user/create-user-form';
import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { AssignRoleForm } from '@/components/role/assign-role';
import { UpdateUserForm } from '@/components/user/update-user-form/UpdateUserForm';

const stepDataForm: UserStepProps = {
    description: 'Datos del usuario',
    icon: <IconUserCheck style={{ width: rem(18), height: rem(18) }} />,
    step: { form: UserDataForm, props: {} }
};
const stepPasswordForm: UserStepProps = {
    description: 'Creacion de contraseña',
    icon: <IconLock style={{ width: rem(18), height: rem(18) }} />,
    step: { form: AuthenticationPasswordForm, props: {} }
};
const stepRoleForm = (roles: RoleType[]): UserStepProps => ({
    description: 'Asignacion de roles',
    icon: <IconLicense style={{ width: rem(18), height: rem(18) }} />,
    step: {
        form: AssignRoleForm,
        props: {
            roles: roles
        }
    },
});

const User: React.FC = () => {

    const userService: IFindService<any, UserType> = new UserService(endpoints.USER.V1);
    const roleService: IFindService<any, RoleType> = new RoleService(endpoints.ROLE.V1);

    const table = useTable<UserType>([], 50);

    const [steps, setSteps] = useState<UserStepProps[]>([]);
    const [selected, setSelected] = useState<UserType>();
    const [roles, setRoles] = useState<RoleType[]>([]);

    const [tableLoading, tableDisclosure] = useDisclosure(true);

    const [openCreateForm, createFormDisclosure] = useDisclosure(false);
    const [openUpdateForm, updateFormDisclusure] = useDisclosure(false);
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

    const onModification = (user: UserType) => { setSelected(user); updateFormDisclusure.open() };
    const onConfiguration = (user: UserType) => { setSelected(user); roleFormDisclosure.open() };
    const onChangePassword = (user: UserType) => { setSelected(user); passwordFormDisclosure.open() };
    const onDelete = (user: UserType) => { setSelected(user); deleteFormDisclosure.open() };

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
        <OmegaTh sort={{ onSort: () => table.setSorting('dni'), sorted: table.sortBy === 'dni' }} >CI</OmegaTh>
        <OmegaTh sort={{ onSort: () => table.setSorting('name'), sorted: table.sortBy === 'name' }} >Nombre</OmegaTh>
        <OmegaTh sort={{ onSort: () => table.setSorting('lastname'), sorted: table.sortBy === 'lastname' }} >Apellido</OmegaTh>
        <OmegaTh sort={{ onSort: () => table.setSorting('email'), sorted: table.sortBy === 'email' }} >Correo Electronico</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const userGroups = () => {
        if (openCreateForm) return <CreateUserForm onClose={createFormDisclosure.close} steps={steps} />;
        if (openUpdateForm) return <UpdateUserForm onClose={updateFormDisclusure.close} user={selected!} />;
        if (openRoleForm) return 'openRoleForm';
        if (openPasswordForm) return 'openPasswordForm';
        return <>
            <DeleteUserDialog opened={openDeleteForm} user={selected?.id || -1} onClose={deleteFormDisclosure.close} />
            <Group justify="space-between" mb={rem(16)}>
                <Text
                    tt="uppercase"
                    fw={700}
                    component='span'
                    variant='text'
                    c="omegaColors"
                    size='lg'>
                    Usuarios registrados en el sistema
                </Text>
                {
                    steps.length &&
                    <Center>
                        <Tooltip label={'Crear usuario'}>
                            <ActionIcon
                                size='lg'
                                variant="transparent"
                                onClick={createFormDisclosure.open}>
                                <IconCirclePlus
                                    style={{ width: rem(64), height: rem(64) }}
                                    stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>
                    </Center>
                }
            </Group>

            <TextInput
                placeholder="Buscar"
                size="xs"
                leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                rightSectionWidth={70}
                styles={{ section: { pointerEvents: 'none' } }}
                mb="sm"
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
    }

    return (userGroups());
}

export default User