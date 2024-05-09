import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { Doctor } from '@/services/api/doctor/dtos'
import { User } from '@/services/api/user/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import React, { useEffect } from 'react'
import { DoctorSettings } from '../doctor-settings/DoctorSettingsMenu';
import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import { IconSearch } from '@tabler/icons-react';
import { SearchInputText } from '@/components/input/SearchInputText';
import { OmegaTd } from '@/components/table/omega-td/OmegaTd';

type DoctorLayoutDataType = Omit<Doctor, 'user'> & Omit<User, 'id'> & { hasCredential: boolean }
const parseResult = (medicalResults: Doctor[]): DoctorLayoutDataType[] => medicalResults.map<DoctorLayoutDataType>((e) => ({
    id: e.id,
    dni: e.user.dni,
    email: e.user.email,
    lastname: e.user.lastname,
    name: e.user.name,
    hasCredential: e.user.hasCredential
}));


type DoctorLayoutProps = {
    load: boolean;
    doctors: Doctor[];
    events: {
        onCreateCredential: (index: number) => void;
        onUploadSignature: (index: number) => void;
    }
}
const DoctorLayout: React.FC<DoctorLayoutProps> = ({ doctors, events, load }) => {

    const tableHook = useTable(parseResult(doctors), 50);

    useEffect(() => {
        tableHook.setData(parseResult(doctors));
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctors]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('dni'), sorted: tableHook.sortBy === 'dni' }} >CI</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('lastname'), sorted: tableHook.sortBy === 'lastname' }} >Apellido</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('email'), sorted: tableHook.sortBy === 'email' }} >Correo Electronico</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <OmegaTd>{row.dni}</OmegaTd>
            <OmegaTd>{row.name}</OmegaTd>
            <OmegaTd>{row.lastname}</OmegaTd>
            <OmegaTd>{row.email}</OmegaTd>
            <OmegaTd>
                <DoctorSettings
                    onCreateCredential={!row.hasCredential ? () => events.onCreateCredential(index) : undefined}
                    onUploadSignature={() => events.onUploadSignature(index)} />
            </OmegaTd>
        </Table.Tr>
    ));

    return (
        <>
            <Header>
                Doctores registrados en el sistema
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
        </>
    )
}

export { DoctorLayout }