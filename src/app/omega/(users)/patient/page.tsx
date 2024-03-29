'use client'

import PatientSettingsMenu from '@/components/patient/patient-settings-menu/PatientSettingsMenu';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import SortTh from '@/components/table/sort-th/SortTh';
import { useTable } from '@/hooks/useTable'
import { PatientFullModel } from '@/services/models/patient.model';
import { PatientViewService } from '@/services/view/patient-view.service';
import { Group, Table, Title, Text, TextInput, rem, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDotsVertical, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useLayoutEffect } from 'react'

type PatientData = PatientFullModel;

const Patient: React.FC = () => {

    const patientViewService = new PatientViewService();
    const table = useTable<PatientData>([], 50);

    const tableLoader = useDisclosure(true);

    useLayoutEffect(() => {
        loadConfiguration();
        return () => { }
    }, [])

    const loadConfiguration = async () => {
        try {
            tableLoader[1].open()
            const { patients } = await patientViewService.initialConfiguration();
            table.setData(patients);
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
            <Table.Td>
                <PatientSettingsMenu link={`patient/${row.dni}`} />
            </Table.Td>
        </Table.Tr>
    );

    const header = <>
        <SortTh sorted={table.sortBy === 'dni'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('dni')}>CI</SortTh>
        <SortTh sorted={table.sortBy === 'name'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('name')}>Nombre</SortTh>
        <SortTh sorted={table.sortBy === 'lastname'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('lastname')}>Apellido</SortTh>
        <SortTh sorted={table.sortBy === 'email'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('email')}>Correo Electronico</SortTh>
        <Table.Td>Acciones</Table.Td>
    </>

    return (
        <>
            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Pacientes
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
                header={header}
                loading={tableLoader[0]}
                rows={rows}
                total={table.total}
                page={table.activePage}
                onPageChange={table.setPage} />
        </>
    )
}

export default Patient