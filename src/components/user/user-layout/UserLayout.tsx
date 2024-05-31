import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { User } from '@/services/api/user/dtos';
import { ActionIcon, Flex, Table, Tooltip, rem } from '@mantine/core';
import React, { useEffect } from 'react'
import UserSettingsMenu from '../user-settings-menu/UserSettingsMenu';
import { SearchInputText } from '@/components/input/SearchInputText';
import { OmegaTd } from '@/components/table/omega-td/OmegaTd';
import ModularBox from '@/components/modular-box/ModularBox';
import { IconPlus } from '@tabler/icons-react';

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
            <Flex direction='column' gap={rem(8)}>
                <Header text={'Usuarios'}>
                    <Tooltip
                        label={'Crear usuario'}
                        withArrow>
                        <ActionIcon radius='xl' size='sm' onClick={events.onCreate}>
                            <IconPlus style={{ width: rem(16), height: rem(16) }} />
                        </ActionIcon>
                    </Tooltip>
                </Header>

                <ModularBox>
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
                </ModularBox>
            </Flex>
        </>
    );
}

export default UserLayout