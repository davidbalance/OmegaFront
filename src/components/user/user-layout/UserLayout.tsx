import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { User } from '@/services/api/user/dtos';
import { Table } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import React, { useEffect } from 'react'
import UserSettingsMenu from '../user-settings-menu/UserSettingsMenu';
import { SearchInputText } from '@/components/input/SearchInputText';
import { OmegaTd } from '@/components/table/omega-td/OmegaTd';

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
    const tableHook = useTable(users, 50);

    useEffect(() => {
        tableHook.setData(users);
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('dni'), sorted: tableHook.sortBy === 'dni' }} >CI</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('lastname'), sorted: tableHook.sortBy === 'lastname' }} >Apellido</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('email'), sorted: tableHook.sortBy === 'email' }} >Correo Electronico</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <OmegaTd>{row.dni}</OmegaTd>
            <OmegaTd>{row.name}</OmegaTd>
            <OmegaTd>{row.lastname}</OmegaTd>
            <OmegaTd>{row.email}</OmegaTd>
            <OmegaTd>
                <UserSettingsMenu
                    onModification={() => events.onModification(index)}
                    onConfiguration={() => events.onConfiguration(index)}
                    onChangePassword={() => events.onChangePassword(index)}
                    onDelete={() => events.onDelete(index)}
                />
            </OmegaTd>
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

            <SearchInputText
                placeholder="Buscar"
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