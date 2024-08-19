'use client'

import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListWithFetchContext } from '@/components/layout/list-layout/components/extended/ListWithFetchContext';
import { ListLayoutFetchProvider } from '@/components/layout/list-layout/context/ListFetchPaginationContext';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { MedicalClientFormManagementAreaCreate } from '@/components/medical/client/form/MedicalClientFormManagementAreaCreate';
import MedicalClientLayoutEmail from '@/components/medical/client/layout/MedicalClientLayoutEmail';
import MedicalDiseaseContainer from '@/components/medical/disease/container/MedicalDiseaseContainer';
import MedicalOrderListRow from '@/components/medical/order/row/MedicalOrderListRow';
import { MedicalResultFormUploadFile } from '@/components/medical/result/form/MedicalResultFormUploadFile';
import MedicalResultListRow from '@/components/medical/result/row/MedicalResultListRow';
import PatientListRow from '@/components/patient/row/PatientListRow';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';
import { UserFormJobPositionAssign } from '@/components/user/form/UserFormJobPositionAssign';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalOrder, OrderStatus } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalReport } from '@/lib/dtos/medical/report/base.respoonse.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Patient } from '@/lib/dtos/user/patient/base.response.dto';
import { Title, Flex, Text, Grid, ActionIcon, rem, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconRefresh } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutState {
    DEFAULT,
    EMAIL,
    UPDATE_PATIENT_MANAGEMENT_AREA,
    UPDATE_EMPLOYEE,
    UPDATE_JOB_POSITION,
    UPLOAD_RESULT_FILE,
}

const patientColumns: ListElement<Patient>[] = [
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
    const [patientSelected, setPatientSelected] = useState<Patient | null>(null);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrder | null>(null);
    const [medicalResultSelected, setMedicalResultSelected] = useState<MedicalResult | null>(null);
    const [shouldFetchMedicalOrder, setShouldFetchMedicalOrder] = useState<boolean>(false);

    const {
        data: fetchedOrders,
        loading: orderLoading,
        error: orderError,
        reload: orderReload,
    } = useFetch<MedicalOrder[]>(`/api/medical/orders/patient/${patientSelected?.dni}`, 'GET', { loadOnMount: false });

    const [medicalOrders, {
        override: medicalOrderOverride,
        update: medicalOrderUpdate
    }] = useList<MedicalOrder>([]);

    const [medicalResults, {
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResult>([]);

    const handlePatientSelection = useCallback((selection: Patient): void => {
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
        setMedicalOrderSelected(prev => prev ? ({ ...prev, orderStatus: state }) : null);
    }, [medicalOrderUpdate]);

    const handleClickEventAssignModal = useCallback((selection: Patient) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.UPDATE_EMPLOYEE);
    }, []);

    const handleClickEventUploadResultFile = useCallback((selection: MedicalResult) => {
        setMedicalResultSelected(selection);
        setCurrentState(LayoutState.UPLOAD_RESULT_FILE);
    }, []);

    const handleClickEventEmail = useCallback((selection: Patient) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.EMAIL);
    }, []);

    const handleClickEventManagementArea = useCallback((selection: Patient) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.UPDATE_PATIENT_MANAGEMENT_AREA);
    }, []);

    const handleClickEventJobPosition = useCallback((selection: Patient) => {
        setPatientSelected(selection);
        setCurrentState(LayoutState.UPDATE_JOB_POSITION);
    }, []);

    const handleFormSubmittionEventUploadFile = useCallback((id: number) => {
        medicalResultUpdate('id', id, { hasFile: true });
    }, [medicalResultUpdate]);

    const handleClickEventDeleteMedicalResultFile = useCallback((id: number) => {
        medicalResultUpdate('id', id, { hasFile: false });
    }, [medicalResultUpdate]);

    const handlePatientRow = useCallback((row: Patient) => (
        <PatientListRow
            key={row.id}
            data={row}
            active={row.id === patientSelected?.id}
            actions={{
                onCompany: handleClickEventAssignModal,
                onEmail: handleClickEventEmail,
                onJobPosition: handleClickEventManagementArea,
                onManagementArea: handleClickEventJobPosition
            }}
            onClick={() => handlePatientSelection(row)}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </PatientListRow>
    ), [patientSelected, handlePatientSelection, handleClickEventAssignModal, handleClickEventEmail, handleClickEventManagementArea, handleClickEventJobPosition]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <MedicalOrderListRow
            key={row.id}
            data={row}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            actions={{
                onMail: handleEventMailSend,
                onValidate: handleEventOrderStatus
            }}>
            <Grid>
                <Grid.Col span={8}>
                    <Flex direction='column'>
                        <Title order={6}>{row.process}</Title>
                        <Text>{dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </Flex>
                </Grid.Col>
            </Grid>
        </MedicalOrderListRow>
    ), [medicalOrderSelected, handleOrderSelection, handleEventMailSend, handleEventOrderStatus]);

    const handleMedicalResultModification = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, data);
        if (medicalOrderSelected) {
            const updatedOrder = { ...medicalOrderSelected };
            const resultIndex = updatedOrder.results.findIndex(e => e.id === data.id);
            if (resultIndex !== -1) {
                updatedOrder.results[resultIndex] = data;
                medicalOrderUpdate('id', updatedOrder.id, updatedOrder);
            }
        }
    }, [medicalOrderSelected, medicalOrderUpdate, medicalResultUpdate]);

    const handleResultFileDownloadFail = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, { hasFile: false });
        if (medicalOrderSelected) {
            const newMedicalResultArr = medicalResults.map(e => e.id === data.id ? ({ ...e, hasFile: true }) : e);
            medicalOrderUpdate('id', medicalOrderSelected.id, { results: newMedicalResultArr });
        }
    }, [medicalOrderSelected, medicalResults, medicalResultUpdate, medicalOrderUpdate]);

    const handleReportFileDownloadFail = useCallback((data: MedicalReport, medicalResult: number) => {
        medicalResultUpdate('id', medicalResult, { hasFile: false });
        if (medicalOrderSelected) {
            const newMedicalResultArr: MedicalResult[] = medicalResults.map(e => e.id === medicalResult ? ({ ...e, report: { ...data, hasFile: false } }) : e);
            medicalOrderUpdate('id', medicalOrderSelected.id, { results: newMedicalResultArr });
        }
    }, [medicalOrderSelected, medicalResults, medicalResultUpdate, medicalOrderUpdate]);

    const handleMedicalResultRow = useCallback((row: MedicalResult) => {
        const currentStatus = medicalOrderSelected?.orderStatus;
        const actions = {
            preview: true,
            downloadReport: !!row.report && row.report.hasFile,
            downloadResult: row.hasFile,
            onDiseaseModification: currentStatus === 'created' ? handleMedicalResultModification : undefined,
            onExamModification: currentStatus === 'created' ? handleMedicalResultModification : undefined,
            onUploadResult: currentStatus === 'created' ? () => handleClickEventUploadResultFile(row) : undefined,
            onDeleteResultFile: currentStatus === 'created' ? () => handleClickEventDeleteMedicalResultFile(row.id) : undefined,
            onMedicalResultFileDownloadFail: () => handleResultFileDownloadFail(row),
            onMedicalReportFileDownloadFail: row.report ? () => handleReportFileDownloadFail(row.report!, row.id) : undefined
        }

        return <MedicalResultListRow
            key={row.id}
            data={row}
            actions={actions}>
            <Title order={6}>{row.examName}</Title>
            <MedicalDiseaseContainer data={row.diseases || []} />
            {!row.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
            {!row.report && <Text size='xs' c='red'>Reporte no realizado</Text>}
        </MedicalResultListRow>;
    }, [
        medicalOrderSelected,
        handleClickEventUploadResultFile,
        handleClickEventDeleteMedicalResultFile,
        handleMedicalResultModification,
        handleResultFileDownloadFail,
        handleReportFileDownloadFail
    ]);

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
            element: <ListWithFetchContext<Patient>
                key='patient-list-layout'
                columns={patientColumns}
                rows={handlePatientRow}
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
        // setPatientSelected(null);
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
        [LayoutState.UPDATE_JOB_POSITION]: (
            <UserFormJobPositionAssign
                dni={patientSelected?.dni!}
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

    useEffect(() => {
        if (fetchedOrders) medicalOrderOverride(fetchedOrders);
    }, [fetchedOrders, medicalOrderOverride]);

    useEffect(() => {
        if (medicalOrderSelected) medicalResultOverride(medicalOrderSelected.results);
    }, [medicalOrderSelected, medicalResultOverride]);

    useEffect(() => {
        if (orderError) notifications.show({ message: orderError.message, color: 'red' });
    }, [orderError]);

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
            <ListLayoutFetchProvider<Patient>
                url={'/api/patients/paginate'}
                size={50}>
                {view[currentState]}
            </ListLayoutFetchProvider >
        </>
    );
}


export default PatientPage