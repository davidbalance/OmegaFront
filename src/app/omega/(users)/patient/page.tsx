'use client'

import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import MedicalDiseaseContainer from '@/components/medical/disease/container/MedicalDiseaseContainer';
import MedicalOrderListRow from '@/components/medical/order/row/MedicalOrderListRow';
import MedicalResultListRow from '@/components/medical/result/row/MedicalResultListRow';
import PatientListRow from '@/components/patient/row/PatientListRow';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalReport } from '@/lib/dtos/medical/report/base.respoonse.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Patient } from '@/lib/dtos/user/patient/base.response.dto';
import { Title, Flex, Text, Grid, ActionIcon, rem, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconRefresh } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutState {
    DEFAULT
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
    const [currentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [patientSelected, setPatientSelected] = useState<Patient | null>(null);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrder | null>(null);
    const [shouldFetchMedicalOrder, setShouldFetchMedicalOrder] = useState<boolean>(false);

    const {
        data: fetchedPatients,
        loading: patientLoading,
        error: patientError,
    } = useFetch<Patient[]>('/api/patients/look/company', 'GET');

    const {
        data: fetchedOrders,
        loading: orderLoading,
        error: orderError,
        reload: orderReload,
    } = useFetch<MedicalOrder[]>(`/api/medical/orders/patient/${patientSelected?.dni}`, 'GET', { loadOnMount: false });

    const [patients, {
        override: patientOverride,
    }] = useList<Patient>([]);

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

    const handlePatientRow = useCallback((row: Patient) => (
        <PatientListRow
            key={row.id}
            data={row}
            active={row.id === patientSelected?.id}
            onClick={() => handlePatientSelection(row)}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </PatientListRow>
    ), [patientSelected, handlePatientSelection]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <MedicalOrderListRow
            key={row.id}
            data={row}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}>
            <Grid>
                <Grid.Col span={8}>
                    <Flex direction='column'>
                        <Title order={6}>{row.process}</Title>
                        <Text>{dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </Flex>
                </Grid.Col>
            </Grid>
        </MedicalOrderListRow>
    ), [medicalOrderSelected, handleOrderSelection]);

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
        const actions = {
            downloadReport: !!row.report && row.report.hasFile,
            downloadResult: row.hasFile,
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
    }, [handleResultFileDownloadFail, handleReportFileDownloadFail]);

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
            element: <ListLayout<Patient>
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
        patients,
        reloadOrderButton,
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

    useEffect(() => {
        if (fetchedPatients)
            patientOverride(fetchedPatients);
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

    return (
        <>{view[currentState]}</>
    );
}


export default PatientPage