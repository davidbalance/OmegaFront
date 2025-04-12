<<<<<<< HEAD
import React from 'react'
import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Box, Flex, Group, rem, Title } from '@mantine/core';
import OrderHeader from './_components/order-header';
import ServerPagination from '@/components/_base/server-pagination';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import { retriveMedicalOrder, retriveMedicalOrdersPatient } from '@/server';
import ListTbody from '@/components/_base/list/list-tbody';
import OrderPatientItem from './_components/order-patient-item';
import TestHeader from '@/components/test_header';
import { MedicalOrder } from '@/server/medical-order/server-types';
import { retriveMedicalTests } from '@/server';
import TestItem from '@/components/test_item';

const take: number = 100;
interface OmegaAdminOrderPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaAdminOrderPage: React.FC<OmegaAdminOrderPageProps> = async ({
    searchParams
}) => {
    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const orderActive = typeof searchParams.medicalOrder === 'string' ? searchParams.medicalOrder : undefined;
    const orderSearch = typeof searchParams.medicalOrderSearch === 'string' ? searchParams.medicalOrderSearch : undefined;
    const orderField = owner === 'medicalOrder' ? field : undefined;
    const orderPage = typeof searchParams.medicalOrderPage === 'string' ? Number(searchParams.medicalOrderPage) : 1;

    const testSearch = typeof searchParams.medicalTestSearch === 'string' ? searchParams.medicalTestSearch : undefined;
    const testField = owner === 'medicalTest' ? field : undefined;

    const orderValue = await retriveMedicalOrdersPatient({
        filter: orderSearch,
        orderField: orderField as any,
        orderValue: orderingValue as any,
        skip: orderPage - 1,
        limit: take
    });
    const orderValues = orderValue.data ?? [];
    const medicalOrder: MedicalOrder | null = orderActive ? await retriveMedicalOrder(orderActive) : null;
    const totalOrderPage = Math.floor(orderValue.amount / take);

    const testValues = orderActive
        ? await retriveMedicalTests({
            orderId: orderActive,
            filter: testSearch,
            orderField: testField as any,
            orderValue: orderingValue as any
        })
        : [];

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!orderActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Ordenes medicas</Title>
                            </Box>
                            <ReloadButton />
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='medicalOrderSearch'
                            value={orderSearch}
                            removeQueries={['field', 'owner', 'order', 'medicalOrder', 'medicalOrderPage']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <OrderHeader />
                            <ListTbody>
                                {orderValues.map(e => <OrderPatientItem
                                    key={e.orderId}
                                    active={orderActive}
                                    removeQueries={['medicalTestSearch']}
                                    {...e} />)}
                            </ListTbody>
                        </ListRoot>
                    </ModularBox>
                    {totalOrderPage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='medicalOrderPage'
                                page={orderPage}
                                total={totalOrderPage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!orderActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Resultados medicos</Title>
                            </Box>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['medicalOrder']}
                                    hiddenFrom='md' />
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='medicalTestSearch'
                            value={testSearch}
                            removeQueries={['field', 'owner', 'order']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <TestHeader />
                            <ListTbody>
                                {testValues.map(e => <TestItem
                                    key={e.testId}
                                    notEditReports
                                    orderStatus={medicalOrder?.orderStatus ?? 'created'}
                                    {...e} />)}
                            </ListTbody>
                        </ListRoot>
                    </ModularBox>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>);
}

export default OmegaAdminOrderPage
=======
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
>>>>>>> main
