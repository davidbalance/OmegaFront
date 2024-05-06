import { useTable } from '@/hooks';
import { TextInput, rem, Text } from '@mantine/core';
import React, { useEffect } from 'react'
import { Patient } from '@/services/api/patient/dtos';
import { User } from '@/services/api/user/dtos';
import { Header } from '@/components/header/Header';
import { IconSearch } from '@tabler/icons-react';
import { PatientTable } from '../patient-table/PatientTable';
import { PatientCollapsableRow } from '../patient-table/PatientCollapsableRow';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import PatientTh from '../patient-table/patient-th/PatientTh';
import { SearchInputText } from '@/components/input/SearchInputText';

type PatientLayoutDataType = Omit<Patient, 'user'> & Omit<User, 'id'>;
const parsePatient = (medicalResults: Patient[]): PatientLayoutDataType[] => medicalResults.map<PatientLayoutDataType>((e) => ({
    id: e.id,
    dni: e.user.dni,
    name: e.user.name,
    lastname: e.user.lastname,
    email: e.user.email,
    birthday: e.birthday,
    gender: e.gender
}));

type PatientLayoutProps = {
    load: boolean;
    patients: Patient[];
}
const PatientLayout: React.FC<PatientLayoutProps> = ({ patients, load }) => {

    const tableHook = useTable(parsePatient(patients), 50);

    useEffect(() => {
        tableHook.setData(parsePatient(patients));
        return () => { }
    }, [patients]);

    const header: React.ReactElement[] = [
        <PatientTh sort={{ onSort: () => tableHook.setSorting('dni'), sorted: tableHook.sortBy === 'dni' }}>CI</PatientTh>,
        <PatientTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }}>Nombre</PatientTh>,
        <PatientTh sort={{ onSort: () => tableHook.setSorting('lastname'), sorted: tableHook.sortBy === 'lastname' }}>Apellido</PatientTh>,
        <PatientTh sort={{ onSort: () => tableHook.setSorting('email'), sorted: tableHook.sortBy === 'email' }}>Correo Electronico</PatientTh>,
        <PatientTh><></></PatientTh>
    ];

    const rows = tableHook.rows.map((row) => (
        <PatientCollapsableRow
            key={row.id}
            entries={[
                <Text size='sm' fw={500}>{row.dni}</Text>,
                <Text size='sm' fw={500}>{row.name}</Text>,
                <Text size='sm' fw={500}>{row.lastname}</Text>,
                <Text size='sm' fw={500}>{row.email}</Text>
            ]}
            dni={row.dni}>
        </PatientCollapsableRow>
    ));

    return (
        <>
            <Header>
                Pacientes registrados en el sistema
            </Header>

            <SearchInputText
                placeholder="Buscar"
                value={tableHook.search}
                onChange={tableHook.onSearch}
            />

            <PatientTable
                header={header}
                loading={load}
                rows={rows}
                total={tableHook.total}
                page={tableHook.page}
                onPageChange={tableHook.setPage} />
        </>
    )
}

export { PatientLayout }