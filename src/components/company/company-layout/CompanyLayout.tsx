import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { Company } from '@/services/api/company/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react'

type CompayLayoutProps = {
    load: boolean;
    companies: Company[];
}

const CompanyLayout: React.FC<CompayLayoutProps> = ({ companies, load}) => {
    const tableHook = useTable(companies, 50);

    useEffect(() => {
        tableHook.setData(companies);
        return () => { }
    }, [companies]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre de la Compañia</OmegaTh>,
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('ruc'), sorted: tableHook.sortBy === 'ruc' }} >RUC</OmegaTh>,
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('address'), sorted: tableHook.sortBy === 'address' }} >Dirección</OmegaTh>,
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('phone'), sorted: tableHook.sortBy === 'phone' }} >Teléfono</OmegaTh>
    </>

    const rows = tableHook.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.ruc}</Table.Td>
            <Table.Td>{row.address}</Table.Td>
            <Table.Td>{row.phone}</Table.Td>
        </Table.Tr>
    ));

    return <>
        <Header>
            Compañias registradas en el sistema
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

export { CompanyLayout }