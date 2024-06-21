'use client'

import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import MedicalClientLayoutEmail from '@/components/medical/client/layout/MedicalClientLayoutEmail';
import MedicalOrderActionMenu from '@/components/medical/order/action/MedicalOrderActionMenu';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { MedicalResultFormDisease } from '@/components/medical/result/form/MedicalResultFormDisease';
import { PatientActionButton } from '@/components/patient/action/PatientActionButton';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalOrder } from '@/lib/dtos/medical/order/response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { Patient } from '@/lib/dtos/user/patient.response.dto';
import { User } from '@/lib/dtos/user/user.response.dto';
import { Title, Flex, Text, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type PatientDataType = Omit<Patient, 'user'> & Omit<User, 'id'> & { user: number };
const parsePatient = (patients: Patient[]): PatientDataType[] => patients.map<PatientDataType>((e) => ({
    id: e.id,
    dni: e.user.dni,
    name: e.user.name,
    lastname: e.user.lastname,
    email: e.user.email,
    birthday: e.birthday,
    gender: e.gender,
    user: e.user.id
}));

enum LayoutState {
    DEFAULT,
    EMAIL,
    UPDATE_EMPLOYEE
}

const patientColumns: ListElement<PatientDataType>[] = [
    { key: 'dni', name: 'Cedula' },
    { key: 'name', name: 'Nombre' },
    { key: 'lastname', name: 'Apellido' },
];

const medicalOrderColumns: ListElement<MedicalOrder>[] = [
    { key: 'process', name: 'Proceso' },
    { key: 'createAt', name: 'Fecha de creacion' },
];

const medicalResultColumns: ListElement<MedicalResult>[] = [
    { key: 'examName', name: 'Examen medico' },
];


const PatientPage: React.FC = () => {

    const [active, setActive] = useState(0);
    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [patientSelected, setPatientSelected] = useState<PatientDataType | null>(null);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrder | null>(null);
    const [medicalResultSelected, setMedicalResultSelected] = useState<MedicalResult | null>(null);
    const [shouldFetchMedicalOrder, setShouldFetchMedicalOrder] = useState<boolean>(false);

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
    }] = useList<MedicalResult>([]);

    const parsedPatients = useMemo(() => parsePatient(fetchedPatients || []), [fetchedPatients]);

    const handlePatientSelection = useCallback((selection: PatientDataType): void => {
        setPatientSelected(selection);
        setMedicalOrderSelected(null);
        setShouldFetchMedicalOrder(true);
    }, []);

    const handleOrderSelection = useCallback((selection: MedicalOrder): void => {
        setMedicalOrderSelected(selection);
        setActive(2);
    }, []);

    const handleEventMailSend = useCallback((id: number, state: boolean) => {
        medicalOrderUpdate('id', id, { mailStatus: state });
    }, [medicalOrderUpdate]);

    const handleClickEventAssignModal = useCallback((selection: PatientDataType) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.UPDATE_EMPLOYEE);
    }, []);

    const handleClickEventEmail = useCallback((selection: PatientDataType) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.EMAIL);
    }, []);

    const handlePatientRow = useCallback((row: PatientDataType) => (
        <ListRowElement
            key={row.id}
            active={row.id === patientSelected?.id}
            onClick={() => handlePatientSelection(row)}
            rightSection={<PatientActionButton
                onAssignCompany={() => handleClickEventAssignModal(row)}
                onEmail={() => handleClickEventEmail(row)} />}
        >
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </ListRowElement>
    ), [patientSelected, handlePatientSelection, handleClickEventAssignModal, handleClickEventEmail]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <ListRowElement
            key={row.id}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            rightSection={
                <MedicalOrderActionMenu
                    order={row.id}
                    email={row.client.email}
                    onMailSend={handleEventMailSend} />}
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

    const handleMedicalResultRow = useCallback((row: MedicalResult) => (
        <ListRowElement
            key={row.id}
            rightSection={<MedicalResultActionMenu
                onDiseaseModification={() => setMedicalResultSelected(row)}
                downloadReport={!!row.report}
                downloadResult
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
            element: <ListLayout<MedicalResult>
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

    const handleCloseEvent = useCallback(() => {
        setPatientSelected(null);
        setCurrentState(LayoutState.DEFAULT);
    }, []);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTierEvent}
            />
        ),
        [LayoutState.EMAIL]: (
            <MedicalClientLayoutEmail
                onClose={handleCloseEvent}
                patient={patientSelected!} />
        ),
        [LayoutState.UPDATE_EMPLOYEE]: (
            <UserFormAssignCompanyAttribute
                url={`/api/users/attribute/employee/${patientSelected?.user}`}
                onClose={handleCloseEvent} />
        )
    }), [multipleLayerComponents, active, handleCloseTierEvent, handleCloseEvent, patientSelected]);

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
        if (shouldFetchMedicalOrder && patientSelected) {
            orderReload();
            setActive(1);
            medicalResultOverride([]);
            setShouldFetchMedicalOrder(false);
        }
    }, [shouldFetchMedicalOrder, patientSelected, orderReload, medicalResultOverride]);

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