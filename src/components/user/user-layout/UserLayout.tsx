import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { User } from '@/services/api/user/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import { IconCirclePlus, IconSearch } from '@tabler/icons-react';
import React from 'react'
import UserSettingsMenu from '../user-settings-menu/UserSettingsMenu';

type UserLayoutProps = {
    users: User[];
    events: {
        onCreate: () => void;
        onModification: (index: number) => void;
        onConfiguration: (index: number) => void;
        onChangePassword: (index: number) => void;
        onDelete: (index: number) => void;
    },
    load?: boolean
}

const UserLayout: React.FC<UserLayoutProps> = ({ users, events, load = false }) => {
    const tableHook = useTable(users, 500);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('dni'), sorted: tableHook.sortBy === 'dni' }} >CI</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('lastname'), sorted: tableHook.sortBy === 'lastname' }} >Apellido</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('email'), sorted: tableHook.sortBy === 'email' }} >Correo Electronico</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.dni}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.lastname}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>
                <UserSettingsMenu
                    onModification={() => events.onModification(index)}
                    onConfiguration={() => events.onConfiguration(index)}
                    onChangePassword={() => events.onChangePassword(index)}
                    onDelete={() => events.onDelete(index)}
                />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Header
                button={{
                    icon: IconCirclePlus,
                    onClick: events.onCreate,
                    show: true
                }}>
                Usuarios registrados en el sistema
            </Header>

            <TextInput
                placeholder="Buscar"
                size="xs"
                leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                rightSectionWidth={70}
                styles={{ section: { pointerEvents: 'none' } }}
                mb="sm"
                value={tableHook.search}
                onChange={tableHook.onSearch}
            />

            <OmegaTable
                loading={load}
                header={header}
                rows={rows}
                total={tableHook.total}
                page={tableHook.page}
                onPageChange={tableHook.setPage} />
        </>
    );
}

export default UserLayout