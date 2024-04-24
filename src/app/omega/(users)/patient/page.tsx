'use client'

import PatientSettingsMenu from '@/components/patient/patient-settings-menu/PatientSettingsMenu';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import SortTh from '@/components/table/sort-th/SortTh';
import { useTable } from '@/hooks/useTable'
import { PatientService } from '@/services/api';
import { Patient as PatientType } from '@/services/api/patient/dtos';
import { User as UserType } from '@/services/api/user/dtos';
import endpoints from '@/services/endpoints/endpoints';
import { IFindService } from '@/services/interfaces';
import { Group, Table, Title, TextInput, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import React, { useLayoutEffect } from 'react'

const patientService: IFindService<any, PatientType> = new PatientService(endpoints.PATIENT.V1);

type PatientData = Omit<PatientType, 'user'> & Omit<UserType, 'id'>;

const Patient: React.FC = () => {
    const table = useTable<PatientData>([], 50);

    const [tableLoading, TableDisclosure] = useDisclosure(true);

    useLayoutEffect(() => {
        load();
        return () => { }
    }, [])

    const load = async () => {
        try {
            TableDisclosure.open()
            const patients = await patientService.find();
            const patientsData: PatientData[] = patients.reduce((prev: PatientData[], curr) => [...prev, { ...curr, ...curr.user }], []);
            table.setData(patientsData);
        } catch (error) {
            console.error(error);
            notifications.show({
                message: 'Se ha producido un error al cargar los pacientes'
            });
        } finally {
            TableDisclosure.close();
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
        <SortTh
            sorted={table.sortBy === 'dni'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('dni')}>
            CI
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'name'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('name')}>
            Nombre
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'lastname'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('lastname')}>
            Apellido
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'email'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('email')}>
            Correo Electronico
        </SortTh>
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
                loading={tableLoading}
                rows={rows}
                total={table.total}
                page={table.page}
                onPageChange={table.setPage} />
        </>
    )
}

export default Patient