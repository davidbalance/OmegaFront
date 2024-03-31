'use client'

import ResultSettingsMenu from '@/components/report/result-settings-menu/ResultSettingsMenu'
import OmegaTable from '@/components/table/omega-table/OmegaTable'
import SortTh from '@/components/table/sort-th/SortTh'
import { useTable } from '@/hooks/useTable'
import { MedicalReportModel, ResultModel } from '@/services'
import { Group, Table, TextInput, Title, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { table } from 'console'
import React, { useState } from 'react'

type ResultData = ResultModel;

const MedicalReport: React.FC = () => {

    const table = useTable<ResultData>([], 50);
    const [selected, setSelected] = useState<ResultData>();

    const tableLoader = useDisclosure(true);
    const reportDisclosure = useDisclosure(false);

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.examName}</Table.Td>
            <Table.Td>
                <ResultSettingsMenu onCreateClick={reportDisclosure[1].open} />
            </Table.Td>
        </Table.Tr>
    ));

    const header = <>
        <SortTh sorted={table.sortBy === 'examName'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('examName')} >Examen</SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    return (
        <>
            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Resultados
                </Title>
            </Group>
            <br />

            <TextInput
                placeholder="Busca cualquier campo"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={table.search}
                onChange={table.onSeach}
            />
            <OmegaTable
                loading={tableLoader[0]}
                header={header}
                rows={rows}
                total={table.total}
                page={table.activePage}
                onPageChange={table.setPage} />
        </>
    )
}

export default MedicalReport