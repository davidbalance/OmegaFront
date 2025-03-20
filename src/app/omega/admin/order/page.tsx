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
import { retriveMedicalOrder, retriveMedicalOrdersPatient } from '@/server/medical_order/actions';
import ListTbody from '@/components/_base/list/list-tbody';
import OrderPatientItem from './_components/order-patient-item';
import TestHeader from '@/components/test_header';
import { MedicalOrder } from '@/server/medical_order/server_types';
import { retriveMedicalTests } from '@/server/medical_test/actions';
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