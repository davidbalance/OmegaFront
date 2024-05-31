import { useTable } from '@/hooks';
import { rem, Text, Flex, Space, Box, Pagination, ScrollArea, Title, ActionIcon } from '@mantine/core';
import React, { useEffect } from 'react'
import { Patient } from '@/services/api/patient/dtos';
import { User } from '@/services/api/user/dtos';
import { Header } from '@/components/header/Header';
import { PatientCollapsableRow } from '../patient-table/PatientCollapsableRow';
import PatientTh from '../patient-table/patient-th/PatientTh';
import { SearchInputText } from '@/components/input/SearchInputText';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { IconDotsVertical, IconFolder, IconFolderOpen, IconGridDots, IconMenu2 } from '@tabler/icons-react';
import { MultipleLayerItem } from '@/components/list/multiple-layer-item/MultipleLayerItem';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patients]);

    const header: React.ReactElement[] = [
        <PatientTh key={1} sort={{ onSort: () => tableHook.setSorting('dni'), sorted: tableHook.sortBy === 'dni' }}>CI</PatientTh>,
        <PatientTh key={2} sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }}>Nombre</PatientTh>,
        <PatientTh key={3} sort={{ onSort: () => tableHook.setSorting('lastname'), sorted: tableHook.sortBy === 'lastname' }}>Apellido</PatientTh>,
        <PatientTh key={4} sort={{ onSort: () => tableHook.setSorting('email'), sorted: tableHook.sortBy === 'email' }}>Correo Electronico</PatientTh>,
        <PatientTh key={5}><></></PatientTh>
    ];

    const rows = tableHook.rows.map((row) => (
        <PatientCollapsableRow
            key={row.id}
            entries={[
                <Text key={1} size='sm' fw={500}>{row.dni}</Text>,
                <Text key={2} size='sm' fw={500}>{row.name}</Text>,
                <Text key={3} size='sm' fw={500}>{row.lastname}</Text>,
                <Text key={4} size='sm' fw={500}>{row.email}</Text>
            ]}
            dni={row.dni}>
        </PatientCollapsableRow>
    ));

    return (
        <>
            <Flex h='100%' gap={rem(8)}>
                <ModularBox>
                    <Header text={'Pacientes'} />
                    <SearchInputText
                        placeholder="Buscar"
                        value={tableHook.search}
                        onChange={tableHook.onSearch}
                    />
                    <ScrollArea.Autosize mah='75%' style={{ flex: 1 }}>
                        <MultipleLayerItem
                            leftSection={<IconFolder style={{ width: rem(28), height: rem(28) }} />}
                            rightSection={
                                <ActionIcon variant='transparent' size='sm'>
                                    <IconDotsVertical style={{ width: rem(28), height: rem(28) }} />
                                </ActionIcon>
                            }
                            onClick={() => { }} label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                        <MultipleLayerItem label={{ title: 'Label title', description: 'Label description' }} />
                    </ScrollArea.Autosize>
                    <Pagination total={4} size='xs' style={{ alignSelf: 'center' }} />
                </ModularBox>
                <ModularBox>
                    <Header text={'Ordenes'} />
                </ModularBox>
                <ModularBox>
                    <Header text={'Examenes'} />
                </ModularBox>
            </Flex>
        </>
    )
}

export { PatientLayout }