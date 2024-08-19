'use client'

import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import MedicalOrderListRow from '@/components/medical/order/row/MedicalOrderListRow';
import { MedicalReportForm } from '@/components/medical/report/form/MedicalReportForm';
import { MedicalReportFormUploadFile } from '@/components/medical/report/form/MedicalReportFormUploadFile';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import MedicalResultListRow from '@/components/medical/result/row/MedicalResultListRow';
import PatientListRow from '@/components/patient/row/PatientListRow';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalClient } from '@/lib/dtos/medical/client/base.response.dto';
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Title, Grid, Flex, Text, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutStates {
    DEFAULT,
    INSERT_REPORT,
    UPLOAD_FILE
}

const patientColumns: ListElement<MedicalClient>[] = [
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

const MedicalReport: React.FC = () => {

    const [active, setActive] = useState(0);
    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [patientSelected, setPatientSelected] = useState<MedicalClient | null>(null);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrder | null>(null);
    const [medicalResultSelected, setMedicalResultSelected] = useState<MedicalResult | null>(null);
    const [shouldFetchMedicalOrder, setShouldFetchMedicalOrder] = useState<boolean>(false);

    const {
        data: fetchedPatients,
        loading: patientLoading,
        error: patientError,
    } = useFetch<MedicalClient[]>('/api/medical/client/doctor', 'GET');

    const {
        data: fetchedOrders,
        loading: orderLoading,
        error: orderError,
        reload: orderReload,
    } = useFetch<MedicalOrder[]>(`/api/medical/orders/patient/${patientSelected?.dni}/doctor`, 'GET', { loadOnMount: false });

    const [patients, {
        override: patientOverride,
    }] = useList<MedicalClient>([]);

    const [medicalOrders, {
        override: medicalOrderOverride,
        update: medicalOrderUpdate
    }] = useList<MedicalOrder>([]);

    const [medicalResults, {
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResult>([]);

    const handlePatientSelection = useCallback((selection: MedicalClient): void => {
        setPatientSelected(selection);
        setMedicalOrderSelected(null);
        setShouldFetchMedicalOrder(true);
    }, []);

    const handleOrderSelection = useCallback((selection: MedicalOrder): void => {
        setMedicalOrderSelected(selection);
        setActive(2);
    }, []);

    const handlePatientRow = useCallback((row: MedicalClient) => (
        <PatientListRow
            key={row.dni}
            data={row as any}
            active={row.dni === patientSelected?.dni}
            onClick={() => handlePatientSelection(row)}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </PatientListRow>
    ), [patientSelected, handlePatientSelection]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => {
        const notDoneReports: number = row.results.reduce((prev, curr) => (!curr.report ? 1 : 0) + prev, 0);

        return <MedicalOrderListRow
            key={row.id}
            data={row}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}>
            <Grid>
                <Grid.Col span={8}>
                    <Flex direction='column'>
                        <Title order={6}>{row.process}</Title>
                        <Text mb={rem(8)}>{dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        {!notDoneReports ? <Text>Reportes completos</Text> : <Text c='red'>Reportes faltantes {notDoneReports}</Text>}
                    </Flex>
                </Grid.Col>
            </Grid>
        </MedicalOrderListRow>
    }, [medicalOrderSelected, handleOrderSelection]);

    const handleCreateEvent = useCallback((data: MedicalResult) => {
        setMedicalResultSelected(data);
        setCurrentState(LayoutStates.INSERT_REPORT);
    }, []);

    const handleUploadReportEvent = useCallback((data: MedicalResult) => {
        setMedicalResultSelected(data);
        setCurrentState(LayoutStates.UPLOAD_FILE);
    }, []);

    const handleMedicalResultRow = useCallback((row: MedicalResult) => {
        const reportDone = !!row.report && row.report.hasFile;

        const actions = {
            preview: true,
            downloadReport: !!row.report,
            downloadResult: row.hasFile,
            onCreateReport: () => handleCreateEvent(row),
            onUploadReport: reportDone ? () => handleUploadReportEvent(row) : undefined
        }

        return <MedicalResultListRow
            key={row.id}
            data={row}
            actions={actions}>
            <Title order={6}>{row.examName}</Title>
            {!row.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
            {reportDone ? (
                <Text size='xs' c='blue'>Reporte realizado</Text>
            ) : (
                <Text size='xs' c='red'>Reporte no realizado</Text>
            )}
        </MedicalResultListRow>;/* (
    ) */}, [handleCreateEvent, handleUploadReportEvent]);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Pacientes',
            element: <ListLayout<MedicalClient>
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
        // setPatientSelected(null);
        setCurrentState(LayoutStates.DEFAULT);
    }, []);

    const handleFormSubmittion = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, data);
    }, [medicalResultUpdate]);

    const view = useMemo((): Record<LayoutStates, React.ReactNode> => ({
        [LayoutStates.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTierEvent}
            />
        ),
        [LayoutStates.INSERT_REPORT]: (
            <MedicalReportForm
                result={medicalResultSelected!}
                onClose={handleCloseEvent}
                onFormSubmittion={handleFormSubmittion} />
        ),
        [LayoutStates.UPLOAD_FILE]: (
            <MedicalReportFormUploadFile
                medicalReport={medicalResultSelected?.report?.id!}
                onClose={handleCloseEvent}
                onFormSubmittion={medicalResultSelected && medicalResultSelected.report
                    ? () => handleFormSubmittion({ ...medicalResultSelected, report: { ...medicalResultSelected.report!, hasFile: true } })
                    : undefined
                } />
        ),
    }), [multipleLayerComponents, active, handleCloseTierEvent, handleCloseEvent, handleFormSubmittion, medicalResultSelected]);

    useEffect(() => {
        if (fetchedPatients && fetchedPatients.length > 0) patientOverride(fetchedPatients);
    }, [fetchedPatients, patientOverride]);

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


    return <>{view[currentState]}</>
}

export default MedicalReport