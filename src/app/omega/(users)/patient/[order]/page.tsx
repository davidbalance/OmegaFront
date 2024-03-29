'use client'

import PatientResultDrawer from '@/components/patient/patient-result-drawer/PatientResultDrawer';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import SortTh from '@/components/table/sort-th/SortTh';
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu';
import { useTable } from '@/hooks/useTable';
import { MorbidityModel } from '@/services';
import { PatientOrderViewService } from '@/services/view/patient-order-view.service';
import { Group, Table, Text, TextInput, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useEffect, useLayoutEffect, useState } from 'react'


type ResultData = {
    examName: string
};

type PatientOrderData = {
    id: number;
    createAt: Date;
    process: string;
    results: ResultData[];
}

type PatientOrderProps = { params: { order: string } };
const PatientOrder: React.FC<PatientOrderProps> = ({ params }) => {

    const patientOrderView = new PatientOrderViewService(params.order);

    const [results, setResults] = useState<ResultData[]>([]);
    const [morbidities, setMorbidities] = useState<MorbidityModel[]>([]);

    const table = useTable<PatientOrderData>([], 50);

    const tableLoader = useDisclosure(true);
    const resultDisclosure = useDisclosure(false);

    useLayoutEffect(() => {
        loadConfiguration();
    }, []);

    const loadConfiguration = async () => {
        try {
            tableLoader[1].open();
            const { orders, morbidities } = await patientOrderView.initialConfiguration();
            table.setData(orders);
            setMorbidities(morbidities);
        } catch (error) {
        } finally {
            tableLoader[1].close();
        }
    }

    const handleRowClick = (data: ResultData[]) => {
        setResults(data);
        resultDisclosure[1].open();
    }

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(row.results)}>
            <Table.Td>{dayjs(row.createAt).format("YYYY-MM-DD")}</Table.Td>
            <Table.Td>{row.process}</Table.Td>
        </Table.Tr>
    ));

    const header = <>
        <SortTh sorted={table.sortBy === 'createAt'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('createAt')} >Fecha</SortTh>
        <SortTh sorted={table.sortBy === 'process'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('process')} >Proceso</SortTh>
    </>

    return (
        <>
            <PatientResultDrawer
                opened={resultDisclosure[0]}
                onClose={resultDisclosure[1].close}
                patientResults={results}
                morbidities={morbidities} />

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Pedidos realizados
                </Title>
                <Text fw={600}>
                    Paciente: {params.order}
                </Text>
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

export default PatientOrder