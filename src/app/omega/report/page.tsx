'use client'

import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { MedicalReportForm } from '@/components/medical/report/form/MedicalReportForm';
import { MedicalReportFormUploadFile } from '@/components/medical/report/form/MedicalReportFormUploadFile';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalClient } from '@/lib/dtos/medical/client/base.response.dto';
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Title, Grid, Flex, Text } from '@mantine/core';
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
        <ListRow
            key={row.dni}
            active={row.dni === patientSelected?.dni}
            onClick={() => handlePatientSelection(row)}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </ListRow>
    ), [patientSelected, handlePatientSelection]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <ListRow
            key={row.id}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
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
        </ListRow>
    ), [medicalOrderSelected, handleOrderSelection]);

    const handleCreateEvent = useCallback((data: MedicalResult) => {
        setMedicalResultSelected(data);
        setCurrentState(LayoutStates.INSERT_REPORT);
    }, []);

    const handleUploadReportEvent = useCallback((data: MedicalResult) => {
        setMedicalResultSelected(data);
        setCurrentState(LayoutStates.UPLOAD_FILE);
    }, []);

    const handleMedicalResultRow = useCallback((row: MedicalResult) => (
        <ListRow
            key={row.id}
            rightSection={<MedicalResultActionMenu
                data={row}
                preview
                onCreateReport={() => handleCreateEvent(row)}
                downloadReport={!!row.report}
                downloadResult={row.hasFile}
                onUploadReport={
                    !!row.report && row.report?.hasFile
                        ? () => handleUploadReportEvent(row)
                        : undefined
                } />}
        >
            <Title order={6}>{row.examName}</Title>
            {!row.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
            {!!row.report && row.report.hasFile
                ? <Text size='xs' c='blue'>Reporte realizado</Text>
                : <Text size='xs' c='red'>Reporte no realizado</Text>
            }
        </ListRow>
    ), [handleCreateEvent]);

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