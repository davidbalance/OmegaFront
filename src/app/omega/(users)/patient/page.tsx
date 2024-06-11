'use client'

import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { Patient } from '@/services/api/patient/dtos';
import { User } from '@/services/api/user/dtos';
import { rem, ActionIcon, Title, Flex, Text } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type PatientDataType = Omit<Patient, 'user'> & Omit<User, 'id'>;
const parsePatient = (patients: Patient[]): PatientDataType[] => patients.map<PatientDataType>((e) => ({
    id: e.id,
    dni: e.user.dni,
    name: e.user.name,
    lastname: e.user.lastname,
    email: e.user.email,
    birthday: e.birthday,
    gender: e.gender
}));

enum LayoutState {
    DEFAULT
}

const PatientPage: React.FC = () => {
    const { data: fetchedPatients, loading: patientLoading } = useFetch<Patient[]>('/api/patients', 'GET');
    const parsedPatients = useMemo(() => parsePatient(fetchedPatients || []), [fetchedPatients]);
    const [patients, PatientListHandler] = useList<PatientDataType>([]);
    const [active, setActive] = useState(0);
    const [currentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [patientSelected, setPatientSelected] = useState<PatientDataType | null>(null);

    useEffect(() => {
        if (parsedPatients.length > 0) {
            PatientListHandler.override(parsedPatients);
        }
    }, [parsedPatients]);

    const handlePatientSelection = useCallback((selection: PatientDataType): void => {
        setPatientSelected(selection);
        setActive(1);
    }, [])


    const handlePatientRow = useCallback((row: PatientDataType) => (
        <ListRowElement<PatientDataType>
            key={row.id} active={row.id === patientSelected?.id}
            onClick={() => handlePatientSelection(row)}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Flex direction='row' justify='space-between'>
                <Text>{row.dni}</Text>
                <Text>{row.email}</Text>
            </Flex>
        </ListRowElement>
    ), [patientSelected, handlePatientSelection]);

    const patientColumns = useMemo((): ListElement<PatientDataType>[] => [{ key: 'dni', name: 'Cedula' }, { key: 'name', name: 'Nombre' }, { key: 'lastname', name: 'Apellido' }], []);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Pacientes',
            element: <ListLayout<PatientDataType> loading={patientLoading} data={patients} columns={patientColumns} rows={handlePatientRow} size={100} />
        },
        {
            title: patientSelected ? `Ordenes de: ${patientSelected.name} ${patientSelected.lastname}` : 'Ordenes',
            element: <></>
        },
        {
            title: 'Resultados',
            element: <></>
        }
    ], [patientLoading, patients, patientColumns, handlePatientRow, patientSelected]);

    const handleCloseTier = useCallback(() => {
        setActive(prev => {
            const newValue = prev - 1;
            if (newValue === 0) {
                setPatientSelected(null);
            }
            return newValue;
        });
    }, []);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTier} />
        )
    }), [multipleLayerComponents, active, handleCloseTier]);

    return (
        <>{view[currentState]}</>
    );
}


export default PatientPage