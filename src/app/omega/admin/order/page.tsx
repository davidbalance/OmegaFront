'use client'

import ActionMenu from '@/components/_base/ActionMenu';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListWithFetchContext } from '@/components/layout/list-layout/components/extended/ListWithFetchContext';
import { ListLayoutFetchForceItemUpdate, ListLayoutFetchProvider } from '@/components/layout/list-layout/context/ListFetchPaginationContext';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import MedicalDiseaseContainer from '@/components/medical/disease/container/MedicalDiseaseContainer';
import MedicalOrderFlatListRow from '@/components/medical/order/row/MedicalOrderFlatListRow';
import { MedicalResultFormUploadFile } from '@/components/medical/result/form/MedicalResultFormUploadFile';
import { withMedicalResultFile } from '@/components/medical/result/hoc/menu/with-medical-result-file';
import { withMedicalResultManagement } from '@/components/medical/result/hoc/menu/with-medical-result-management';
import { withMedicalResultReport } from '@/components/medical/result/hoc/menu/with-medical-result-report';
import MedicalResultListRow from '@/components/medical/result/row/MedicalResultListRow';
import { useList } from '@/hooks/useList';
import { MedicalOrderFlat, OrderStatus } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalReport } from '@/lib/dtos/medical/report/base.respoonse.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Title, Flex, Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const MedicalResultMenu = withMedicalResultReport(withMedicalResultFile(withMedicalResultManagement(ActionMenu)));

enum LayoutState {
    DEFAULT,
    UPLOAD_RESULT_FILE
}

const medicalOrderColumns: ListElement<MedicalOrderFlat>[] = [
    { key: 'dni', name: 'Cedula' },
    { key: 'fullname', name: 'Completo' },
    { key: 'process', name: 'Proceso' },
];

const medicalResultColumns: ListElement<MedicalResult>[] = [
    { key: 'examName', name: 'Examen medico' },
];

const AdminOrderPage = () => {

    const [active, setActive] = useState(0);
    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [medicalOrderSelected, setMedicalOrderSelected] = useState<MedicalOrderFlat | null>(null);
    const [medicalResultSelected, setMedicalResultSelected] = useState<MedicalResult | null>(null);

    const [forceMedicalOrderUpdate, setForceMedicalOrderUpdate] = useState<ListLayoutFetchForceItemUpdate<MedicalOrderFlat> | null>(null);

    const [medicalResults, {
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResult>([]);

    const handleOrderSelection = useCallback((selection: MedicalOrderFlat): void => {
        setMedicalOrderSelected(selection);
        setActive(1);
    }, []);

    const handleFormSubmittionEventUploadFile = useCallback((id: number) => {
        medicalResultUpdate('id', id, { hasFile: true });
    }, [medicalResultUpdate]);

    const handleClickEventDeleteMedicalResultFile = useCallback((id: number) => {
        medicalResultUpdate('id', id, { hasFile: false });
    }, [medicalResultUpdate]);

    const handleForceUpdateEvent = useCallback(() => {
        setForceMedicalOrderUpdate(null);
    }, []);

    const handleEventMailSend = useCallback((id: number, state: boolean) => {
        setForceMedicalOrderUpdate({
            callback: handleForceUpdateEvent,
            key: 'id',
            value: id,
            newValue: { mailStatus: state }
        });
    }, [handleForceUpdateEvent]);

    const handleEventOrderStatus = useCallback((id: number, state: OrderStatus) => {
        setForceMedicalOrderUpdate({
            callback: handleForceUpdateEvent,
            key: 'id',
            value: id,
            newValue: { orderStatus: state }
        });
    }, [handleForceUpdateEvent]);

    const handleClickEventUploadResultFile = useCallback((selection: MedicalResult) => {
        setMedicalResultSelected(selection);
        setCurrentState(LayoutState.UPLOAD_RESULT_FILE);
    }, []);

    const handleMedicalOrderResultFormSubmittion = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, data);
        if (medicalOrderSelected) {
            const updatedOrder = { ...medicalOrderSelected };
            const resultIndex = updatedOrder.results.findIndex(e => e.id === data.id);
            if (resultIndex !== -1) {
                updatedOrder.results[resultIndex] = data;
                setForceMedicalOrderUpdate({
                    key: 'id',
                    value: updatedOrder.id,
                    newValue: updatedOrder,
                    callback: handleForceUpdateEvent
                });
            }
        }
    }, [medicalOrderSelected, handleForceUpdateEvent, medicalResultUpdate]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrderFlat) => (
        <MedicalOrderFlatListRow
            key={row.id}
            data={row}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            actions={{
                onMail: handleEventMailSend,
                onValidate: handleEventOrderStatus
            }}>
            <Grid>
                <Grid.Col span={4}>
                    <Flex direction='column'>
                        <Title order={6}>{row.fullname}</Title>
                        <Text>{row.dni}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Flex direction='column'>
                        <Title order={6}>{row.companyName}</Title>
                        <Text>{row.companyRuc}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Flex direction='column'>
                        <Title order={6}>{row.process}</Title>
                        <Text>{dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </Flex>
                </Grid.Col>
            </Grid>
        </MedicalOrderFlatListRow>
    ), [medicalOrderSelected, handleOrderSelection, handleEventMailSend, handleEventOrderStatus]);

    const handleResultFileDownloadFail = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, { hasFile: false });
        if (medicalOrderSelected) {
            const newMedicalResultArr = medicalResults.map(e => e.id === data.id ? ({ ...data, hasFile: true }) : e);
            setForceMedicalOrderUpdate({
                callback: handleForceUpdateEvent,
                key: 'id',
                value: medicalOrderSelected.id,
                newValue: { results: newMedicalResultArr }
            });
        }
    }, [medicalOrderSelected, medicalResults, handleForceUpdateEvent, medicalResultUpdate]);

    const handleReportFileDownloadFail = useCallback((data: MedicalReport, medicalResult: number) => {
        medicalResultUpdate('id', medicalResult, { hasFile: false });
        if (medicalOrderSelected) {
            const newMedicalResultArr: MedicalResult[] = medicalResults.map(e => e.id === medicalResult ? ({ ...e, report: { ...data, hasFile: false } }) : e);
            setForceMedicalOrderUpdate({
                callback: handleForceUpdateEvent,
                key: 'id',
                value: medicalOrderSelected.id,
                newValue: { results: newMedicalResultArr }
            });
        }
    }, [medicalOrderSelected, medicalResults, handleForceUpdateEvent, medicalResultUpdate]);

    const handleMedicalResultRow = useCallback((row: MedicalResult) => {
        const currentStatus = medicalOrderSelected?.orderStatus;
        const hasReport = !!row.report && row.report.hasFile;

        const menu = <MedicalResultMenu
            result={row}
            onDiseaseModification={currentStatus === 'created' ? handleMedicalOrderResultFormSubmittion : undefined}
            onExamType={currentStatus === 'created' ? handleMedicalOrderResultFormSubmittion : undefined}
            onUploadResultFile={currentStatus === 'created' ? () => handleClickEventUploadResultFile(row) : undefined}
            onDeleteResultFile={currentStatus === 'created' ? () => handleClickEventDeleteMedicalResultFile(row.id) : undefined}
        />

        return <MedicalResultListRow
            key={row.id}
            data={row}
            menu={menu}>
            <Title order={6}>{row.examName}</Title>
            <MedicalDiseaseContainer data={row.diseases || []} />
            {!row.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
            {!row.report && <Text size='xs' c='red'>Reporte no realizado</Text>}
        </MedicalResultListRow>;
    }, [
        medicalOrderSelected,
        handleClickEventUploadResultFile,
        handleClickEventDeleteMedicalResultFile,
        handleMedicalOrderResultFormSubmittion,
        handleReportFileDownloadFail,
        handleResultFileDownloadFail
    ]);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Ordenes medicas',
            element: <ListWithFetchContext<MedicalOrderFlat>
                key='order-list-layout'
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
        handleMedicalOrderRow,
        medicalResults,
        handleMedicalResultRow
    ]);

    const handleCloseTierEvent = useCallback(() => setActive((prev) => {
        const newValue = prev - 1;
        if (newValue === 0) {
            setMedicalOrderSelected(null);
        } else if (newValue === 1) {
            setMedicalOrderSelected(null);
        }
        return newValue;
    }), []);

    const handleCloseEvent = useCallback(() => {
        // setMedicalOrderSelected(null);
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
        [LayoutState.UPLOAD_RESULT_FILE]: (
            <MedicalResultFormUploadFile
                medicalResult={medicalResultSelected?.id!}
                onClose={handleCloseEvent}
                onFormSubmittion={() => handleFormSubmittionEventUploadFile(medicalResultSelected?.id!)} />
        )
    }), [
        multipleLayerComponents,
        active,
        handleCloseEvent,
        handleCloseTierEvent,
        handleFormSubmittionEventUploadFile,
        medicalResultSelected
    ]);

    useEffect(() => {
        if (medicalOrderSelected) medicalResultOverride(medicalOrderSelected.results);
    }, [medicalOrderSelected, medicalResultOverride]);

    return (
        <>
            <ListLayoutFetchProvider<MedicalOrderFlat>
                url={'/api/medical/orders/paginate'}
                size={50}
                forceItemUpdate={forceMedicalOrderUpdate}>
                {view[currentState]}
            </ListLayoutFetchProvider >
        </>
    );
}

export default AdminOrderPage