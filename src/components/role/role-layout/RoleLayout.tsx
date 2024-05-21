import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { Role } from '@/services/api/role/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import React, { use, useEffect } from 'react'
import RoleSettingsMenu from '../role-settings-menu/RoleSettingsMenu';

type RoleLayoutProps = {
    load: boolean;
    roles: Role[];
    events: {
        onCreate: () => void;
        onDelete: (index: number) => void;
        onModification: (index: number) => void;
    }
}

const RoleLayout: React.FC<RoleLayoutProps> = ({ roles, events, load }) => {
    const tableHook = useTable(roles, 50);

    useEffect(() => {
        tableHook.setData(roles);
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roles]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre del Rol</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id} >
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <RoleSettingsMenu
                    onModification={() => events.onModification(index)}
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
            Roles registradas en el sistema
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

export { RoleLayout }