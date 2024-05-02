import { DiseaseGroupSettings } from '@/components/disease-group/disease-group-settings/DiseaseGroupSettings';
import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { Disease } from '@/services/api/disease/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import { IconCirclePlus, IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react'
import { DiseaseSettings } from '../disease-settings/DiseaseSettings';
import { SearchInputText } from '@/components/input/SearchInputText';

type DiseaseLayoutDataType = Omit<Disease, 'group'> & { group: string };
const parseResult = (medicalResults: Disease[]): DiseaseLayoutDataType[] => medicalResults.map<DiseaseLayoutDataType>((e) => ({ ...e, group: e.group.name }));

type DiseaseLayoutProps = {
    load: boolean;
    diseases: Disease[];
    events: {
        onCreate: () => void;
        onModification: (index: number) => void;
        onDelete: (index: number) => void;
    }
}
const DiseaseLayout: React.FC<DiseaseLayoutProps> = ({ diseases, events, load }) => {
    const tableHook = useTable(parseResult(diseases), 50);

    useEffect(() => {
        tableHook.setData(parseResult(diseases));
        return () => { }
    }, [diseases]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('group'), sorted: tableHook.sortBy === 'group' }} >Grupo de Morbilidades</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre del Morbilidad</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.group}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <DiseaseSettings
                    onModification={() => events.onModification(index)}
                    onDelete={() => events.onDelete(index)} />
            </Table.Td>
        </Table.Tr>
    ));

    return <>
        <Header
            button={{
                icon: IconCirclePlus,
                onClick: events.onCreate,
                show: true
            }}>
            Morbilidades registradas en el sistema
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
    </>;
}

export { DiseaseLayout }