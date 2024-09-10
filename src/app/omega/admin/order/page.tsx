import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import Search from '@/components/_base/search';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Box, Flex, Group, rem, Title } from '@mantine/core';
import React, { Suspense } from 'react'
import MedicalOrderHeader from './_components/medical-order-header';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import { countMedicalOrderExpanded, searchMedicalOrderExpanded } from '@/server/medical-order.actions';
import Await from '@/components/_base/await';
import MedicalOrderBody from './_components/medical-order-body';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import ServerPagination from '@/components/_base/server-pagination';
import MedicalResultHeader from '@/components/medical-result-header';
import { countMedicalResult, searchMedicalResult } from '@/server/medical-result.actions';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import MedicalResultBody from '@/components/medical-result-body';
import RemoveQueryButton from '@/components/_base/remove-query-button';

const take: number = 100;
interface OmegaAdminOrderPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaAdminOrderPage: React.FC<OmegaAdminOrderPageProps> = ({
    searchParams
}) => {
    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const medicalOrder = typeof searchParams.medicalOrder === 'string' ? Number(searchParams.medicalOrder) : undefined;

    const medicalOrderSearch = typeof searchParams.medicalOrderSearch === 'string' ? searchParams.medicalOrderSearch : undefined;
    const medicalOrderField = owner === 'medicalOrder' ? field : undefined;
    const medicalOrderPage = typeof searchParams.medicalOrderPage === 'string' ? Number(searchParams.medicalOrderPage) : 1;

    const medicalResultSearch = typeof searchParams.medicalResultSearch === 'string' ? searchParams.medicalResultSearch : undefined;
    const medicalResultField = owner === 'medicalResult' ? field : undefined;
    const medicalResultPage = typeof searchParams.medicalResultPage === 'string' ? Number(searchParams.medicalResultPage) : 1;

    const medicalOrderPromise = searchMedicalOrderExpanded({ search: medicalOrderSearch, field: medicalOrderField, page: medicalOrderPage - 1, take: take, order: order as any });
    const medicalOrderPagePromise = countMedicalOrderExpanded({ search: medicalOrderSearch, take: take });

    const medicalResultPromise = medicalOrder
        ? searchMedicalResult(medicalOrder, { search: medicalResultSearch, field: medicalResultField, page: medicalResultPage - 1, take: take, order: order as any })
        : new Promise<MedicalResult[]>((resolve) => resolve([]));
    const medicalResultPagePromise = medicalOrder
        ? countMedicalResult(medicalOrder, { search: medicalResultSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!medicalOrder}>
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
                        <Search query='patientSearch' value={medicalOrderSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <MedicalOrderHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={medicalOrderPromise}>
                                    {(orders) => <MedicalOrderBody active={medicalOrder} medicalOrders={orders} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={medicalOrderPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='medicalOrderPage'
                                            page={medicalOrderPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!medicalOrder}>
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
                            </Group>                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='medicalResultSearch' value={medicalResultSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <MedicalResultHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={medicalResultPromise}>
                                    {(medicalResult) => <MedicalResultBody notEditReports medicalResult={medicalResult} order={medicalOrder} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={medicalResultPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='medicalResultPage'
                                            page={medicalResultPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>);
}

export default OmegaAdminOrderPage