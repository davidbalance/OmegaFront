'use client'

import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { PatientExamDiseaseModal } from '@/components/patient/patient-exam-disease-modal/PatientExamDiseaseModal';
import { PatientOrderMenu } from '@/components/patient/patient-exam-menu/PatientOrderExamMenu';
import { PatientOrderExamMenu } from '@/components/patient/patient-order-exam-menu/PatientOrderExamMenu';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { Order, OrderResult } from '@/services/api/order/dtos';
import { Patient } from '@/services/api/patient/dtos';
import { User } from '@/services/api/user/dtos';
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

const PatientPage: React.FC = () => {
    const {
        data: fetchedPatients,
        loading: patientLoading,
        error: patientError,
    } = useFetch<Patient[]>('/api/patients', 'GET');
    const parsedPatients = useMemo(() => parsePatient(fetchedPatients || []), [fetchedPatients]);

    const [active, setActive] = useState(0);
    const [currentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const [patientSelected, setPatientSelected] = useState<PatientDataType | null>(null);
    const [orderSelected, setOrderSelected] = useState<Order | null>(null);
    const [orderExamSelected, setOrderExamSelected] = useState<OrderResult | null>(null);

    const {
        data: fetchedOrders,
        loading: orderLoading,
        error: orderError,
        reload: orderReload,
    } = useFetch<Order[]>(`/api/patients/orders/${patientSelected?.dni}`, 'GET', { loadOnMount: false });

    const [shouldFetchOrder, setShouldFetchOrder] = useState<boolean>(false);

    const [patients, PatientListHandler] = useList<PatientDataType>([]);
    const [orders, { override: orderOverride, update: orderUpdate }] = useList<Order>([]);
    const [orderResults, OrderResultHandler] = useList<OrderResult>([]);

    const handlePatientSelection = useCallback((selection: PatientDataType): void => {
        setPatientSelected(selection);
        setOrderSelected(null);
        setTimeout(() => setShouldFetchOrder(true), 500);
    }, []);

    const handleOrderSelection = useCallback((selection: Order): void => {
        setOrderSelected(selection);
        setActive(2);
    }, []);

    const handleEventMailSend = useCallback((data: Order) => {
        orderUpdate('id', data.id, data);
    }, [orderUpdate]);

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

    const handleOrderRow = useCallback((row: Order) => (
        <ListRowElement
            key={row.id}
            active={row.id === orderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            rightSection={<PatientOrderMenu data={row} onMailSend={handleEventMailSend} />}>
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
    ), [orderSelected, handleOrderSelection, handleEventMailSend]);

    const handleExamRow = useCallback((row: OrderResult) => (
        <ListRowElement
            key={row.id}
            rightSection={<PatientOrderExamMenu onModification={() => setOrderExamSelected(row)} data={row} />}>
            <Title order={6}>{row.examName}</Title>
        </ListRowElement>
    ), []);

    const patientColumns = useMemo((): ListElement<PatientDataType>[] => [
        { key: 'dni', name: 'Cedula' },
        { key: 'name', name: 'Nombre' },
        { key: 'lastname', name: 'Apellido' },
    ], []);

    const orderColumns = useMemo((): ListElement<Order>[] => [
        { key: 'process', name: 'Proceso' },
        { key: 'createAt', name: 'Fecha de creacion' },
    ], []);

    const examColumns = useMemo((): ListElement<OrderResult>[] => [
        { key: 'examName', name: 'Examen medico' },
    ], []);

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
            element: <ListLayout<Order>
                key='order-list-layout'
                loading={orderLoading}
                data={orders}
                columns={orderColumns}
                rows={handleOrderRow}
            />,
        },
        {
            title: 'Resultados',
            element: <ListLayout<OrderResult>
                key='result-list-layout'
                loading={false}
                data={orderResults}
                columns={examColumns}
                rows={handleExamRow}
            />,
        },
    ], [patientLoading, patients, patientColumns, handlePatientRow, patientSelected, orderLoading, orders, orderColumns, handleOrderRow, orderResults, examColumns, handleExamRow]);

    const handleCloseTier = useCallback(() => {
        setActive((prev) => {
            const newValue = prev - 1;
            if (newValue === 0) {
                setPatientSelected(null);
            } else if (newValue === 1) {
                setOrderSelected(null);
            }
            return newValue;
        });
    }, []);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTier}
            />
        ),
    }), [multipleLayerComponents, active, handleCloseTier]);

    const handleExamModalCloseEvent = useCallback(() => setOrderExamSelected(null), []);

    const handleMedicalOrderResultFormSubmittion = useCallback((data: OrderResult) => {
        OrderResultHandler.update('id', data.id, data);
        if (orderSelected) {
            const updatedOrder = { ...orderSelected };
            const resultIndex = updatedOrder.results.findIndex(e => e.id === data.id);
            if (resultIndex !== -1) {
                updatedOrder.results[resultIndex] = data;
                orderUpdate('id', updatedOrder.id, updatedOrder);
                handleExamModalCloseEvent();
            }
        }
    }, [orderSelected, orderUpdate, OrderResultHandler, handleExamModalCloseEvent]);

    useEffect(() => {
        if (parsedPatients.length > 0) {
            PatientListHandler.override(parsedPatients);
        }
    }, [parsedPatients, PatientListHandler]);

    useEffect(() => {
        if (fetchedOrders) {
            orderOverride(fetchedOrders);
        }
    }, [fetchedOrders, orderOverride]);

    useEffect(() => {
        if (orderSelected) {
            OrderResultHandler.override(orderSelected.results);
        }
    }, [orderSelected, OrderResultHandler]);

    useEffect(() => {
        if (patientError) {
            notifications.show({ message: patientError.message, color: 'red' });
        } else if (orderError) {
            notifications.show({ message: orderError.message, color: 'red' });
        }
    }, [patientError, orderError]);

    useEffect(() => {
        if (shouldFetchOrder) {
            orderReload();
            setActive(1);
            OrderResultHandler.override([]);
            setShouldFetchOrder(false);
        }
    }, [shouldFetchOrder, orderReload, OrderResultHandler]);

    return (
        <>
            <PatientExamDiseaseModal
                medicalOrderExam={orderExamSelected!}
                opened={!!orderExamSelected}
                onClose={handleExamModalCloseEvent}
                onFormSubmitted={handleMedicalOrderResultFormSubmittion} />
            {view[currentState]}
        </>
    );
}


export default PatientPage