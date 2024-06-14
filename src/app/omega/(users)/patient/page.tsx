'use client'

import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import MedicalOrderActionMenu from '@/components/medical/order/action/MedicalOrderActionMenu';
import { MedicalResultFormDisease } from '@/components/medical/result/form/MedicalResultFormDisease';
import { PatientOrderExamMenu } from '@/components/patient/patient-order-exam-menu/PatientOrderExamMenu';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalOrder } from '@/lib/dtos/medical/order/response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { Patient } from '@/lib/dtos/user/patient.response.dto';
import { User } from '@/lib/dtos/user/user.response.dto';
import { Title, Flex, Text, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
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

type MedicalResultWithOrderOmitted = Omit<MedicalResult, 'order'>;

const patientColumns: ListElement<PatientDataType>[] = [
    { key: 'dni', name: 'Cedula' },
    { key: 'name', name: 'Nombre' },
    { key: 'lastname', name: 'Apellido' },
];

const medicalOrderColumns: ListElement<MedicalOrder>[] = [
    { key: 'process', name: 'Proceso' },
    { key: 'createAt', name: 'Fecha de creacion' },
];

const medicalResultColumns: ListElement<MedicalResultWithOrderOmitted>[] = [
    { key: 'examName', name: 'Examen medico' },
];


const PatientPage: React.FC = () => {

    const [active, setActive] = useState(0);
    const [currentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [patientSelected, setPatientSelected] = useState<PatientDataType | null>(null);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrder | null>(null);
    const [medicalResultSelected, setMedicalResultSelected] = useState<MedicalResultWithOrderOmitted | null>(null);
    const [shouldFetchOrder, setShouldFetchOrder] = useState<boolean>(false);

    const {
        data: fetchedPatients,
        loading: patientLoading,
        error: patientError,
    } = useFetch<Patient[]>('/api/patients', 'GET');

    const {
        data: fetchedOrders,
        loading: orderLoading,
        error: orderError,
        reload: orderReload,
    } = useFetch<MedicalOrder[]>(`/api/medical/orders/patient/${patientSelected?.dni}`, 'GET', { loadOnMount: false });

    const [patients, {
        override: patientOverride,
    }] = useList<PatientDataType>([]);

    const [medicalOrders, {
        override: medicalOrderOverride,
        update: medicalOrderUpdate
    }] = useList<MedicalOrder>([]);

    const [medicalResults, {
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResultWithOrderOmitted>([]);

    const parsedPatients = useMemo(() => parsePatient(fetchedPatients || []), [fetchedPatients]);

    const handlePatientSelection = useCallback((selection: PatientDataType): void => {
        setPatientSelected(selection);
        setMedicalOrderSelected(null);
        setShouldFetchOrder(true);
    }, []);

    const handleOrderSelection = useCallback((selection: MedicalOrder): void => {
        setMedicalOrderSelected(selection);
        setActive(2);
    }, []);

    const handleEventMailSend = useCallback((data: MedicalOrder) => {
        medicalOrderUpdate('id', data.id, data);
    }, [medicalOrderUpdate]);

    const handlePatientRow = useCallback((row: PatientDataType) => (
        <ListRowElement
            key={row.id}
            active={row.id === patientSelected?.id}
            onClick={() => handlePatientSelection(row)}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Flex direction='row' justify='space-between'>
                <Text>{row.dni}</Text>
                <Text>{row.email}</Text>
            </Flex>
        </ListRowElement>
    ), [patientSelected, handlePatientSelection]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <ListRowElement
            key={row.id}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            rightSection={<MedicalOrderActionMenu
                data={row}
                onMailSend={(event) => handleEventMailSend({ ...row, ...event })} />}
        >
            <Grid>
                <Grid.Col span={8}>
                    <Flex direction='column'>
                        <Title order={6}>{row.process}</Title>
                        <Text>{dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Flex align='center' h='100%'>
                        {row.mailStatus ? <Text>Correo enviado</Text> : <Text c='red'>Correo no enviado</Text>}
                    </Flex>
                </Grid.Col>
            </Grid>
        </ListRowElement>
    ), [medicalOrderSelected, handleOrderSelection, handleEventMailSend]);

    const handleMedicalResultRow = useCallback((row: MedicalResultWithOrderOmitted) => (
        <ListRowElement
            key={row.id}
            rightSection={<PatientOrderExamMenu
                onModification={() => setMedicalResultSelected(row)}
                data={row} />}
        >
            <Title order={6}>{row.examName}</Title>
        </ListRowElement>
    ), []);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Pacientes',
            element: <ListLayout<PatientDataType>
                key='patient-list-layout'
                loading={patientLoading}
                data={patients}
                columns={patientColumns}
                rows={handlePatientRow}
                size={100}
            />,
        },
        {
            title: patientSelected ? `Ordenes de: ${patientSelected.name} ${patientSelected.lastname}` : 'Ordenes',
            element: <ListLayout<MedicalOrder>
                key='order-list-layout'
                loading={orderLoading}
                data={medicalOrders}
                columns={medicalOrderColumns}
                rows={handleMedicalOrderRow}
            />,
        },
        {
            title: 'Resultados',
            element: <ListLayout<MedicalResultWithOrderOmitted>
                key='result-list-layout'
                loading={false}
                data={medicalResults}
                columns={medicalResultColumns}
                rows={handleMedicalResultRow}
            />,
        },
    ], [
        patientLoading,
        patients,
        handlePatientRow,
        patientSelected,
        orderLoading,
        medicalOrders,
        handleMedicalOrderRow,
        medicalResults,
        handleMedicalResultRow
    ]);

    const handleCloseTierEvent = useCallback(() => setActive((prev) => {
        const newValue = prev - 1;
        if (newValue === 0) {
            setPatientSelected(null);
        } else if (newValue === 1) {
            setMedicalOrderSelected(null);
        }
        return newValue;
    }), []);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTierEvent}
            />
        ),
    }), [multipleLayerComponents, active, handleCloseTierEvent]);

    const handleExamModalCloseEvent = useCallback(() => setMedicalResultSelected(null), []);

    const handleMedicalOrderResultFormSubmittion = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, data);
        if (medicalOrderSelected) {
            const updatedOrder = { ...medicalOrderSelected };
            const resultIndex = updatedOrder.results.findIndex(e => e.id === data.id);
            if (resultIndex !== -1) {
                updatedOrder.results[resultIndex] = data;
                medicalOrderUpdate('id', updatedOrder.id, updatedOrder);
                handleExamModalCloseEvent();
            }
        }
    }, [medicalOrderSelected, medicalOrderUpdate, medicalResultUpdate, handleExamModalCloseEvent]);

    useEffect(() => {
        if (parsedPatients.length > 0) patientOverride(parsedPatients);
    }, [parsedPatients, patientOverride]);

    useEffect(() => {
        if (fetchedOrders) medicalOrderOverride(fetchedOrders);
    }, [fetchedOrders, medicalOrderOverride]);

    useEffect(() => {
        if (medicalOrderSelected) medicalResultOverride(medicalOrderSelected.results);
    }, [medicalOrderSelected, medicalResultOverride]);

    useEffect(() => {
        if (patientError) notifications.show({ message: patientError.message, color: 'red' });
        else if (orderError) notifications.show({ message: orderError.message, color: 'red' });
    }, [patientError, orderError]);

    useEffect(() => {
        if (shouldFetchOrder && medicalOrderSelected) {
            orderReload();
            setActive(1);
            medicalResultOverride([]);
            setShouldFetchOrder(false);
        }
    }, [shouldFetchOrder, medicalOrderSelected, orderReload, medicalResultOverride]);

    return (
        <>
            <MedicalResultFormDisease
                medicalOrderExam={medicalResultSelected!}
                opened={!!medicalResultSelected}
                onClose={handleExamModalCloseEvent}
                onFormSubmitted={handleMedicalOrderResultFormSubmittion} />
            {view[currentState]}
        </>
    );
}


export default PatientPage