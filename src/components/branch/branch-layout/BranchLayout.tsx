import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { Branch } from '@/services/api/branch/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react'

type BranchLayoutProps = {
    load: boolean;
    branches: Branch[];
}

const BranchLayout: React.FC<BranchLayoutProps> = ({ branches, load}) => {
    const tableHook = useTable(branches, 50);

    useEffect(() => {
        tableHook.setData(branches);
        return () => { }
    }, [branches]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre de la Sucursal</OmegaTh>
    </>

    const rows = tableHook.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
        </Table.Tr>
    ));

    return <>
        <Header>
            Sucursales registradas en el sistema
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
    </>;

}

export { BranchLayout }