<<<<<<< HEAD
import React from 'react'
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Flex, Group, rem } from '@mantine/core'
import ReloadButton from '@/components/_base/reload-button'
import Search from '@/components/_base/search'
import ListRoot from '@/components/_base/list/list-root'
import ServerPagination from '@/components/_base/server-pagination'
import PatientHeader from '@/components/patient-header'
import RemoveQueryButton from '@/components/_base/remove-query-button'
import OrderHeader from '@/components/order_header'
import TestHeader from '@/components/test_header'
import CreateButton from '@/components/_base/create-button'
import { retriveClients } from '@/server'
import { retriveMedicalOrder, retriveMedicalOrders } from '@/server'
import { MedicalOrder } from '@/server/medical-order/server-types'
import { PaginationResponse } from '@/lib/types/pagination.type'
import { MedicalTest } from '@/server/medical-test/server-types'
import { retriveMedicalTests } from '@/server'
import OrderList from '@/components/order_list'
import PatientList from '@/components/patient_list'
import TestList from '@/components/test_list'
import Title from '@/components/_base/mantine/title'
import MassiveLoadButton from '@/components/_base/massive-load-button'

const take: number = 100;
interface PatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const PatientPage: React.FC<PatientPageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;


    const patientActive = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;
    const patientSearch = typeof searchParams.patientSearch === 'string' ? searchParams.patientSearch : undefined;
    const patientField = owner === 'patient' ? field : undefined;
    const patientPage = typeof searchParams.patientPage === 'string' ? Number(searchParams.patientPage) : 1;

    const orderActive = typeof searchParams.medicalOrder === 'string' ? searchParams.medicalOrder : undefined;
    const orderSearch = typeof searchParams.medicalOrderSearch === 'string' ? searchParams.medicalOrderSearch : undefined;
    const orderField = owner === 'medicalOrder' ? field : undefined;
    const orderPage = typeof searchParams.medicalOrderPage === 'string' ? Number(searchParams.medicalOrderPage) : 1;

    const testSearch = typeof searchParams.medicalTestSearch === 'string' ? searchParams.medicalTestSearch : undefined;
    const testField = owner === 'medicalTest' ? field : undefined;

    const patientValue = await retriveClients({
        filter: patientSearch,
        orderField: patientField as any,
        orderValue: orderingValue as any,
        skip: patientPage - 1,
        limit: take
    });
    const totalPatientPage = Math.floor(patientValue.amount / take);

    const orderValue: PaginationResponse<MedicalOrder> = patientActive
        ? await retriveMedicalOrders({
            patientDni: patientActive,
            filter: orderSearch,
            orderField: orderField as any,
            orderValue: orderingValue as any,
            skip: orderPage - 1,
            limit: take,
        })
        : { data: [], amount: 0 };
    const medicalOrder: MedicalOrder | null = orderActive ? await retriveMedicalOrder(orderActive) : null;
    const totalOrderPage = Math.floor(orderValue.amount / take);

    const testValues: MedicalTest[] = orderActive
        ? await retriveMedicalTests({
            orderId: orderActive,
            filter: testSearch,
            orderField: testField as any,
            orderValue: orderingValue as any,
        })
        : [];

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!patientActive && !orderActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Title order={4} component='span'>Pacientes</Title>
                            <Group gap={rem(8)}>
                                <MassiveLoadButton href='/omega/admin/patient/massive-load' />
                                <CreateButton href='/omega/admin/patient/create' />
                                <ReloadButton />
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='patientSearch'
                            value={patientSearch}
                            removeQueries={['field', 'owner', 'order', 'patient', 'patientPage', 'medicalOrder']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <PatientHeader />
                            <PatientList
                                action
                                active={patientActive}
                                patients={patientValue.data}
                                removeQueries={['medicalOrder', 'medicalOrderSearch', 'medicalOrderPage', 'medicalTestSearch']} />
                        </ListRoot>
                    </ModularBox>
                    {totalPatientPage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='patientPage'
                                page={patientPage}
                                total={totalPatientPage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!patientActive && !orderActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Title order={4} component='span'>Ordenes medicas</Title>
                            <Group gap={rem(8)}>
                                <MassiveLoadButton href='/omega/medical/order/massive-load' />
                                {!!patientActive && <CreateButton href={`/omega/medical/order/create?patient=${patientActive}`} />}
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['patient']}
                                    hiddenFrom='md' />
                            </Group>
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
                            <OrderList
                                checklist
                                remove
                                action
                                active={orderActive}
                                patientDni={patientActive}
                                orders={orderValue.data}
                                removeQueries={['medicalTestSearch']} />
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
            <MultipleLayerSection active={!!patientActive && !!orderActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Title order={4} component='span'>Resultados medicos</Title>
                            <Group gap={rem(4)}>
                                {medicalOrder?.orderStatus !== 'validated' && !!orderActive && <CreateButton href={`/omega/medical/test/create?orderId=${orderActive}`} />}
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
                            <TestList
                                tests={testValues}
                                notEditReports
                                orderStatus={medicalOrder?.orderStatus ?? 'created'} />
                        </ListRoot>
                    </ModularBox>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>
    )
}

=======
'use client'

import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListWithFetchContext } from '@/components/layout/list-layout/components/extended/ListWithFetchContext';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListLayoutFetchProvider } from '@/components/layout/list-layout/context/ListFetchPaginationContext';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { MedicalClientFormManagementAreaCreate } from '@/components/medical/client/form/MedicalClientFormManagementAreaCreate';
import MedicalClientLayoutEmail from '@/components/medical/client/layout/MedicalClientLayoutEmail';
import { MedicalOrderActionSendButton } from '@/components/medical/order/action/MedicalOrderActionSendButton';
import { MedicalOrderActionValidateButton } from '@/components/medical/order/action/MedicalOrderActionValidateButton';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { MedicalResultFormUploadFile } from '@/components/medical/result/form/MedicalResultFormUploadFile';
import { PatientActionButton } from '@/components/patient/action/PatientActionButton';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';
import { UserFormJobPositionAssign } from '@/components/user/form/UserFormJobPositionAssign';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalOrder, OrderStatus } from '@/lib/dtos/medical/order/base.response.dto';
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
        <ListRow
            key={row.id}
            active={row.id === patientSelected?.id}
            onClick={() => handlePatientSelection(row)}
            rightSection={(
                <PatientActionButton
                    onAssignCompany={() => handleClickEventAssignModal(row)}
                    onEmail={() => handleClickEventEmail(row)}
                    onManagementArea={() => handleClickEventManagementArea(row)}
                    onJobPosition={() => handleClickEventJobPosition(row)} />
            )}>
            <Title order={6}>{`${row.name} ${row.lastname}`}</Title>
            <Text>{row.dni}</Text>
        </ListRow>
    ), [patientSelected, handlePatientSelection, handleClickEventAssignModal, handleClickEventEmail, handleClickEventManagementArea, handleClickEventJobPosition]);

    const handleMedicalOrderRow = useCallback((row: MedicalOrder) => (
        <ListRow
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
        </ListRow>
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

    const handleMedicalResultRow = useCallback((row: MedicalResult) => (
        <ListRow
            key={row.id}
            rightSection={(
                <MedicalResultActionMenu
                    preview
                    onDiseaseModification={medicalOrderSelected?.orderStatus === 'created'
                        ? handleMedicalResultModification
                        : undefined}
                    onExamModification={medicalOrderSelected?.orderStatus === 'created'
                        ? handleMedicalResultModification
                        : undefined}
                    downloadReport={!!row.report && row.report.hasFile}
                    downloadResult={row.hasFile}
                    onUploadResult={medicalOrderSelected?.orderStatus === 'created'
                        ? () => handleClickEventUploadResultFile(row)
                        : undefined}
                    onDeleteResultFile={medicalOrderSelected?.orderStatus === 'created'
                        ? () => handleClickEventDeleteMedicalResultFile(row.id)
                        : undefined}
                    data={row} />
            )}>
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
    ), [medicalOrderSelected, handleClickEventUploadResultFile, handleClickEventDeleteMedicalResultFile, handleMedicalResultModification]);

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


>>>>>>> main
export default PatientPage