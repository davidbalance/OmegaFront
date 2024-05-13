import { Header } from '@/components/header/Header';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { CorporativeGroup } from '@/services/api/corporative-group/dtos';
import { TextInput, rem, Text} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { use, useEffect } from 'react'
import { CorporativeGroupCollapsableRow } from '../corporative-group-table/CorporativeGroupCollapsableRow';
import { CorporativeGroupTable } from '../corporative-group-table/CorporatievGroupTable';
import CorporativeGroupTh from '../corporative-group-table/CorporativeGroupTh';

type CorporativeGroupLayoutProps = {
    load: boolean;
    corporativeGroups: CorporativeGroup[];
}

const CorporativeGroupLayout: React.FC<CorporativeGroupLayoutProps> = ({ corporativeGroups, load }) => {
    

    const tableHook = useTable(corporativeGroups, 50);
    useEffect(() => {
        tableHook.setData(corporativeGroups);
        return () => { }
    }, [corporativeGroups]);

    const header: React.ReactElement[] = [
        <CorporativeGroupTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre del Grupo Corporativo</CorporativeGroupTh>,
        <CorporativeGroupTh><></></CorporativeGroupTh>
    ];

    const rows = tableHook.rows.map((row) => (
        <CorporativeGroupCollapsableRow 
        id = {row.id.toString()}
        name = {row.name}
        key={row.id} 
        entries = {[
            <Text size='sm' fw={500}>{row.name}</Text>
        ]}>
        </CorporativeGroupCollapsableRow>
    ));

    

    return <>
        <Header>
            Grupos corporativos registradas en el sistema
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

        <CorporativeGroupTable
            loading={load}
            header={header}
            rows={rows}
            total={tableHook.total}
            page={tableHook.page}
            onPageChange={tableHook.setPage} />
    </>;
}

export { CorporativeGroupLayout }