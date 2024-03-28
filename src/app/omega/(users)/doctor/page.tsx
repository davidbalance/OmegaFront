'use client'

import OmegaTable from '@/components/table/omega-table/OmegaTable'
import SortTh from '@/components/table/sort-th/SortTh'
import { useTable } from '@/hooks/useTable'
import { DoctorFullModel } from '@/services'
import { DoctorViewService } from '@/services/view/doctor-view.service'
import { Group, Title, Text, Table, TextInput, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import React, { useLayoutEffect } from 'react'

type DoctorData = DoctorFullModel;

const Doctor: React.FC = () => {

    const doctorViewService = new DoctorViewService();
    const table = useTable<DoctorData>([], 50);

    const tableLoader = useDisclosure(true);

    useLayoutEffect(() => {
        loadConfiguration();
        return () => { }
    }, [])

    const loadConfiguration = async () => {
        try {
            tableLoader[1].open()
            const { doctors } = await doctorViewService.initialConfiguration();
            table.setData(doctors);
        } catch (error) {

        } finally {
            tableLoader[1].close();
        }
    }

    const rows = table.rows.map((row) =>
        <Table.Tr key={row.id}>
            <Table.Td>{row.dni}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.lastname}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
        </Table.Tr>
    );

    const header = <>
        <SortTh sorted={table.sortBy === 'dni'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('dni')}>CI</SortTh>
        <SortTh sorted={table.sortBy === 'email'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('email')}>Correo Electronico</SortTh>
        <SortTh sorted={table.sortBy === 'name'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('name')}>Nombre</SortTh>
        <SortTh sorted={table.sortBy === 'lastname'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('lastname')}>Apellido</SortTh>
    </>

    return (
        <>
            <Group justify="space-between">
                <Text fw={500} fz="sm">
                    <Title component="span" variant="text" c='omegaColors'>
                        Medicos
                    </Title>
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
                header={header}
                loading={tableLoader[0]}
                rows={rows}
                total={table.total}
                page={table.activePage}
                onPageChange={table.setPage} />
        </>
    )
}

export default Doctor