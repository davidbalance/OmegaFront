'use client'

import { ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListElement } from '@/components/layout/list-layout/ListLayoutBase';
import { ListLayoutFetch } from '@/components/layout/list-layout/ListLayoutFetch';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { MedicalClientFormManagementAreaCreate } from '@/components/medical/client/form/MedicalClientFormManagementAreaCreate';
import MedicalClientLayoutEmail from '@/components/medical/client/layout/MedicalClientLayoutEmail';
import { MedicalOrderActionSendButton } from '@/components/medical/order/action/MedicalOrderActionSendButton';
import { MedicalOrderActionValidateButton } from '@/components/medical/order/action/MedicalOrderActionValidateButton';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { MedicalResultFormUploadFile } from '@/components/medical/result/form/MedicalResultFormUploadFile';
import { MedicalResultModalDiseases } from '@/components/medical/result/modal/MedicalResultModalDiseases';
import { PatientActionButton } from '@/components/patient/action/PatientActionButton';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalOrder, OrderStatus } from '@/lib/dtos/medical/order/response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { Patient, PatientPlain } from '@/lib/dtos/user/patient.response.dto';
import { Title, Flex, Text, Grid, ActionIcon, rem, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconRefresh } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const parsePatient = (patients: Patient[]): PatientPlain[] => patients.map<PatientPlain>((e) => ({
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
    UPDATE_PATIENT_MANAGEMENT_AREA,
    UPDATE_EMPLOYEE,
    UPLOAD_RESULT_FILE
}

const patientColumns: ListElement<PatientPlain>[] = [
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
    const [patientSelected, setPatientSelected] = useState<PatientPlain | null>(null);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrder | null>(null);
    const [medicalResultSelected, setMedicalResultSelected] = useState<MedicalResult | null>(null);
    const [shouldFetchMedicalOrder, setShouldFetchMedicalOrder] = useState<boolean>(false);

    const [openedDiseaseModal, {
        open: openDiseaseModal,
        close: closeDiseaseModal
    }] = useDisclosure();

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
    }] = useList<PatientPlain>([]);

    const [medicalOrders, {
        override: medicalOrderOverride,
        update: medicalOrderUpdate
    }] = useList<MedicalOrder>([]);

    const [medicalResults, {
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResult>([]);

    const parsedPatients = useMemo(() => parsePatient(fetchedPatients || []), [fetchedPatients]);

    const handlePatientSelection = useCallback((selection: PatientPlain): void => {
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

    const handleEventOrderStatus = useCallback((id: number, state: OrderStatus) => {
        medicalOrderUpdate('id', id, { orderStatus: state });
    }, [medicalOrderUpdate]);

    const handleClickEventAssignModal = useCallback((selection: PatientPlain) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.UPDATE_EMPLOYEE);
    }, []);

    const handleClickEventUpdateDisease = useCallback((selection: MedicalResult) => {
        setMedicalResultSelected(selection);
        openDiseaseModal();
    }, [openDiseaseModal]);

    const handleClickEventUploadResultFile = useCallback((selection: MedicalResult) => {
        setMedicalResultSelected(selection);
        setCurrentState(LayoutState.UPLOAD_RESULT_FILE);
    }, []);

    const handleClickEventEmail = useCallback((selection: PatientPlain) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.EMAIL);
    }, []);

    const handleClickEventManagementArea = useCallback((selection: PatientPlain) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.UPDATE_PATIENT_MANAGEMENT_AREA);
    }, []);

    const handleFormSubmittionEventUploadFile = useCallback((id: number) => {
        medicalResultUpdate('id', id, { hasFile: true });
    }, [medicalResultUpdate]);

    const handleClickEventDeleteMedicalResultFile = useCallback((id: number) => {
        medicalResultUpdate('id', id, { hasFile: false });
    }, [medicalResultUpdate]);

    const handlePatientRow = useCallback((row: PatientPlain) => (
        <ListRowElement
            key={row.id}
            active={row.id === patientSelected?.id}
            onClick={() => handlePatientSelection(row)}
            rightSection={<PatientActionButton
                onAssignCompany={() => handleClickEventAssignModal(row)}
                onEmail={() => handleClickEventEmail(row)}
                onManagementArea={() => handleClickEventManagementArea(row)} />}
        >
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </ListRowElement>
    ), [patientSelected, handlePatientSelection, handleClickEventAssignModal, handleClickEventEmail, handleClickEventManagementArea]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <ListRowElement
            key={row.id}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            rightSection={
                <Flex align='center' h='100%' gap={rem(16)}>
                    <MedicalOrderActionSendButton
                        order={row.id}
                        email={row.client.email}
                        mailStatus={row.mailStatus}
                        onMailSend={handleEventMailSend} />
                    <MedicalOrderActionValidateButton
                        orderStatus={row.orderStatus}
                        order={row.id}
                        onValidate={handleEventOrderStatus} />
                </Flex>
            }
        >
            <Grid>
                <Grid.Col span={8}>
                    <Flex direction='column'>
                        <Title order={6}>{row.process}</Title>
                        <Text>{dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </Flex>
                </Grid.Col>
            </Grid>
        </ListRowElement>
    ), [medicalOrderSelected, handleOrderSelection, handleEventMailSend, handleEventOrderStatus]);

    const handleMedicalResultRow = useCallback((row: MedicalResult) => (
        <ListRowElement
            key={row.id}
            rightSection={<MedicalResultActionMenu
                onDiseaseModification={() => handleClickEventUpdateDisease(row)}
                downloadReport={!!row.report}
                downloadResult={row.hasFile}
                onUploadResult={() => handleClickEventUploadResultFile(row)}
                onDeleteResultFile={() => handleClickEventDeleteMedicalResultFile(row.id)}
                data={row} />}
        >
            <Title order={6}>{row.examName}</Title>
            {
                (row.diseases && row.diseases.length)
                    ? row.diseases.map((e, index) => (
                        <Box w={150} key={index}>
                            <Text size='xs' c='neutral' truncate='end'>{e.diseaseName}, {e.diseaseCommentary}</Text>
                        </Box>
                    ))
                    : <Text size='xs' c={'red'}>Morbilidades no asociadas</Text>
            }
            {!row.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
            {!row.report && <Text size='xs' c='red'>Reporte no realizado</Text>}
        </ListRowElement>
    ), [handleClickEventUploadResultFile, handleClickEventUpdateDisease, handleClickEventDeleteMedicalResultFile]);

    const handleOrderRefesh = useCallback(() => {
        setMedicalOrderSelected(null);
        medicalResultOverride([]);
        orderReload();
    }, [orderReload, medicalResultOverride]);

    const reloadOrderButton = useMemo(() => patientSelected !== null
        ? (<ActionIcon variant='light' onClick={handleOrderRefesh}>
            <IconRefresh style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>)
        : undefined, [patientSelected, handleOrderRefesh]);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Pacientes',
            element: <ListLayoutFetch<PatientPlain>
                key='patient-list-layout'
                loading={patientLoading}
                columns={patientColumns}
                rows={handlePatientRow}
                size={100}
                url={'/api/patients/paginate'}
            />,
        },
        {
            title: patientSelected ? `Ordenes de: ${patientSelected.name} ${patientSelected.lastname}` : 'Ordenes',
            element: <ListLayout<MedicalOrder>
                key='order-list-layout'
                dock={reloadOrderButton}
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
        handlePatientRow,
        reloadOrderButton,
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
        ),
        [LayoutState.UPLOAD_RESULT_FILE]: (
            <MedicalResultFormUploadFile
                medicalResult={medicalResultSelected?.id!}
                onClose={handleCloseEvent}
                onFormSubmittion={() => handleFormSubmittionEventUploadFile(medicalResultSelected?.id!)} />
        ),
        [LayoutState.UPDATE_PATIENT_MANAGEMENT_AREA]: (
            <MedicalClientFormManagementAreaCreate
                onClose={handleCloseEvent}
                dni={patientSelected?.dni!} />
        )
    }), [
        multipleLayerComponents,
        active,
        handleCloseTierEvent,
        handleCloseEvent,
        handleFormSubmittionEventUploadFile,
        patientSelected,
        medicalResultSelected
    ]);

    const handleExamModalCloseEvent = useCallback(() => {
        setMedicalResultSelected(null)
        closeDiseaseModal();
    }, [closeDiseaseModal]);

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
            <MedicalResultModalDiseases
                medicalResult={medicalResultSelected!}
                opened={!!medicalResultSelected && openedDiseaseModal}
                onClose={handleExamModalCloseEvent}
                onFormSubmitted={handleMedicalOrderResultFormSubmittion} />
            {view[currentState]}
        </>
    );
}


export default PatientPage