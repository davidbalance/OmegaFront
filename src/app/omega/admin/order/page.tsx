'use client'

import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListWithFetchContext } from '@/components/layout/list-layout/components/extended/ListWithFetchContext';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListLayoutFetchForceItemUpdate, ListLayoutFetchProvider } from '@/components/layout/list-layout/context/ListFetchPaginationContext';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { MedicalOrderActionSendButton } from '@/components/medical/order/action/MedicalOrderActionSendButton';
import { MedicalOrderActionValidateButton } from '@/components/medical/order/action/MedicalOrderActionValidateButton';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { MedicalResultFormUploadFile } from '@/components/medical/result/form/MedicalResultFormUploadFile';
import { useList } from '@/hooks/useList';
import { MedicalOrderFlat, OrderStatus } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Title, Flex, Grid, Box, Text, rem } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

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
        <ListRow
            key={row.id}
            active={row.id === medicalOrderSelected?.id}
            onClick={() => handleOrderSelection(row)}
            rightSection={(
                <Flex align='center' h='100%' gap={rem(16)}>
                    <MedicalOrderActionSendButton
                        order={row.id}
                        email={row.email}
                        mailStatus={row.mailStatus}
                        onMailSend={handleEventMailSend} />
                    <MedicalOrderActionValidateButton
                        orderStatus={!!row.orderStatus ? row.orderStatus : 'created'}
                        order={row.id}
                        onValidate={handleEventOrderStatus} />
                </Flex>
            )}>
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
        </ListRow>
    ), [medicalOrderSelected, handleOrderSelection, handleEventMailSend, handleEventOrderStatus]);

    const handleMedicalResultRow = useCallback((row: MedicalResult) => (
        <ListRow
            key={row.id}
            rightSection={<MedicalResultActionMenu
                preview
                onDiseaseModification={medicalOrderSelected?.orderStatus === 'created'
                    ? handleMedicalOrderResultFormSubmittion
                    : undefined}
                onExamModification={medicalOrderSelected?.orderStatus === 'created'
                    ? handleMedicalOrderResultFormSubmittion
                    : undefined}
                downloadReport={!!row.report && row.report.hasFile}
                downloadResult={row.hasFile}
                onUploadResult={medicalOrderSelected?.orderStatus === 'created'
                    ? () => handleClickEventUploadResultFile(row)
                    : undefined}
                onDeleteResultFile={medicalOrderSelected?.orderStatus === 'created'
                    ? () => handleClickEventDeleteMedicalResultFile(row.id)
                    : undefined}
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
        </ListRow>
    ), [medicalOrderSelected, handleClickEventUploadResultFile, handleClickEventDeleteMedicalResultFile, handleMedicalOrderResultFormSubmittion]);

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