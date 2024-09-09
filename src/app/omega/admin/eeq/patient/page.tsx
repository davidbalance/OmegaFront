import Await from '@/components/_base/await';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import MedicalOrderHeader from '@/components/medical-order-header';
import MedicalOrderListBody from '@/components/medical-order-list-body';
import MedicalResultBody from '@/components/medical-result-body';
import MedicalResultHeader from '@/components/medical-result-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { searchMedicalOrder, countMedicalOrder } from '@/server/medical-order.actions';
import { searchMedicalResult, countMedicalResult } from '@/server/medical-result.actions';
import { countPatientEeq, searchPatientEeq } from '@/server/patient.actions';
import { Flex, rem, Box, Title, Group } from '@mantine/core';
import React, { Suspense } from 'react'
import PatientEeqHeader from './_components/patient-eeq-header';
import PatientEeqListBody from './_components/patient-eeq-list-body';

const take: number = 100;
interface OmegaAdminEeqPatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaAdminEeqPatientPage: React.FC<OmegaAdminEeqPatientPageProps> = ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const patient = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;
    const medicalOrder = typeof searchParams.medicalOrder === 'string' ? Number(searchParams.medicalOrder) : undefined;

    const patientSearch = typeof searchParams.patientSearch === 'string' ? searchParams.patientSearch : undefined;
    const patientField = owner === 'patient' ? field : undefined;
    const patientPage = typeof searchParams.patientPage === 'string' ? Number(searchParams.patientPage) : 1;

    const medicalOrderSearch = typeof searchParams.medicalOrderSearch === 'string' ? searchParams.medicalOrderSearch : undefined;
    const medicalOrderField = owner === 'medicalOrder' ? field : undefined;
    const medicalOrderPage = typeof searchParams.medicalOrderPage === 'string' ? Number(searchParams.medicalOrderPage) : 1;

    const medicalResultSearch = typeof searchParams.medicalResultSearch === 'string' ? searchParams.medicalResultSearch : undefined;
    const medicalResultField = owner === 'medicalResult' ? field : undefined;
    const medicalResultPage = typeof searchParams.medicalResultPage === 'string' ? Number(searchParams.medicalResultPage) : 1;

    const patientPromise = searchPatientEeq({ search: patientSearch, field: patientField, page: patientPage - 1, take: take, order: order as any });
    const patientPagePromise = countPatientEeq({ search: patientSearch, take: take });

    const medicalOrderPromise = patient
        ? searchMedicalOrder(patient, { search: medicalOrderSearch, field: medicalOrderField, page: medicalOrderPage - 1, take: take, order: order as any })
        : new Promise<MedicalOrder[]>((resolve) => resolve([]));
    const medicalOrderPagePromise = patient
        ? countMedicalOrder(patient, { search: medicalOrderSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    const medicalResultPromise = medicalOrder
        ? searchMedicalResult(medicalOrder, { search: medicalResultSearch, field: medicalResultField, page: medicalResultPage - 1, take: take, order: order as any })
        : new Promise<MedicalResult[]>((resolve) => resolve([]));
    const medicalResultPagePromise = medicalOrder
        ? countMedicalResult(medicalOrder, { search: medicalResultSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!patient && !medicalOrder}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Pacientes</Title>
                            </Box>
                            <ReloadButton />
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='patientSearch' value={patientSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <PatientEeqHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={patientPromise}>
                                    {(patients) => <PatientEeqListBody action active={patient} patients={patients} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={patientPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='managementPage'
                                            page={patientPage}
                                            total={pages} />
                                    </ModularBox>)}
                                </>)}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!patient && !medicalOrder}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Ordenes medicas</Title>
                            </Box>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['patient']}
                                    hiddenFrom='md' />
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='medicalOrderSearch' value={medicalOrderSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <MedicalOrderHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={medicalOrderPromise}>
                                    {(orders) => patient ? <MedicalOrderListBody active={medicalOrder} orders={orders} dni={patient} /> : <></>}
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
                                    </ModularBox>)}
                                </>)}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!patient && !!medicalOrder}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Resultados medicos</Title>
                            </Box>
                            <ReloadButton />
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='medicalResultSearch' value={medicalResultSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <MedicalResultHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={medicalResultPromise}>
                                    {(medicalResult) => <MedicalResultBody medicalResult={medicalResult} order={medicalOrder} />}
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
        </MultipleLayerRoot>
    )
}

export default OmegaAdminEeqPatientPage