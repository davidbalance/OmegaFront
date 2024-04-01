'use client'

import PatientResultDrawer from '@/components/patient/patient-result-drawer/PatientResultDrawer';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import SortTh from '@/components/table/sort-th/SortTh';
import { useTable } from '@/hooks/useTable';
import { SelectorOption } from '@/lib';
import { DiseaseService, FindOrdersRQ, IFindService, ISelectorService, Order as OrderType, OrderService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { Group, Table, Text, TextInput, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react'

const orderService: IFindService<FindOrdersRQ, OrderType> = new OrderService(endpoints.ORDER.V1);
const diseaseService: ISelectorService<any, number> = new DiseaseService(endpoints.DISEASE.V1);

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


    const [results, setResults] = useState<ResultData[]>([]);
    const [morbidities, setMorbidities] = useState<SelectorOption<number>[]>([]);

    const table = useTable<PatientOrderData>([], 50);

    const [tableLoading, TableDisclosure] = useDisclosure(true);
    const [openResultForm, ResultFormDisclosure] = useDisclosure(false);

    useLayoutEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            TableDisclosure.open();
            const orders = await orderService.find({ dni: params.order });
            const options = await diseaseService.findSelectorOptions();
            console.log(options);
            table.setData(orders);
            setMorbidities(options);
        } catch (error) {
        } finally {
            TableDisclosure.close();
        }
    }

    const handleRowClick = (data: ResultData[]) => {
        setResults(data);
        ResultFormDisclosure.open();
    }

    const rows = table.rows.map((row) => (
        <Table.Tr
            key={row.id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleRowClick(row.results)}>
            <Table.Td>{dayjs(row.createAt).format("YYYY-MM-DD")}</Table.Td>
            <Table.Td>{row.process}</Table.Td>
        </Table.Tr>
    ));

    const header = <>
        <SortTh
            sorted={table.sortBy === 'createAt'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('createAt')} >
            Fecha
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'process'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('process')} >
            Proceso
        </SortTh>
    </>

    return (
        <>
            <PatientResultDrawer
                opened={openResultForm}
                onClose={ResultFormDisclosure.close}
                patientResults={results}
                diseaseOptions={morbidities} />

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
                loading={tableLoading}
                header={header}
                rows={rows}
                total={table.total}
                page={table.page}
                onPageChange={table.setPage} />
        </>
    )
}

export default PatientOrder