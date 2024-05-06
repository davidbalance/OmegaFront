import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { DiseaseGroup } from '@/services/api/disease-group/dtos'
import { Table, TextInput, rem } from '@mantine/core';
import { IconCirclePlus, IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react'
import { DiseaseGroupSettings } from '../disease-group-settings/DiseaseGroupSettings';
import { SearchInputText } from '@/components/input/SearchInputText';

type DiseaseGroupLayoutProps = {
    load: boolean;
    diseaseGroups: DiseaseGroup[];
    events: {
        onCreate: () => void;
        onModification: (index: number) => void;
        onDelete: (index: number) => void;
    }
}

const DiseaseGroupLayout: React.FC<DiseaseGroupLayoutProps> = ({ diseaseGroups, load, events }) => {

    const tableHook = useTable(diseaseGroups, 50);

    useEffect(() => {
        tableHook.setData(diseaseGroups);
        return () => { }
    }, [diseaseGroups]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre del Grupo de Morbilidades</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <DiseaseGroupSettings
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
            Grupos de morbilidades registrados en el sistema
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

export { DiseaseGroupLayout }