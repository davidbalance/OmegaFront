import React from 'react'
import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import ServerPagination from '@/components/_base/server-pagination';
import MedicalOrderHeader from '@/components/medical-order-header';
import MedicalOrderListBody from '@/components/medical-order-list-body';
import MedicalResultBody from '@/components/medical-result-body';
import MedicalResultHeader from '@/components/medical-result-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { searchMedicalOrder, countMedicalOrder } from '@/server/medical-order.actions';
import { searchMedicalResult, countMedicalResult } from '@/server/medical-result.actions';
import { countPatientEeq, searchPatientEeq } from '@/server/patient.actions';
import { Flex, rem, Box, Title, Group } from '@mantine/core';
import PatientEeqHeader from './_components/patient-eeq-header';
import PatientEeqListBody from './_components/patient-eeq-list-body';
import Search from '@/components/_base/search';
import CreateButton from '@/components/_base/create-button';

const take: number = 100;
interface OmegaAdminEeqPatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaAdminEeqPatientPage: React.FC<OmegaAdminEeqPatientPageProps> = async ({
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

    const patients = await searchPatientEeq({ search: patientSearch, field: patientField, page: patientPage - 1, take: take, order: order as any });
    const patientPages = await countPatientEeq({ search: patientSearch, take: take });

    const medicalOrders = patient
        ? await searchMedicalOrder(patient, { search: medicalOrderSearch, field: medicalOrderField, page: medicalOrderPage - 1, take: take, order: order as any })
        : [];
    const medicalOrderPages = patient
        ? await countMedicalOrder(patient, { search: medicalOrderSearch, take: take })
        : 0;

    const medicalResults = medicalOrder
        ? await searchMedicalResult(medicalOrder, { search: medicalResultSearch, field: medicalResultField, page: medicalResultPage - 1, take: take, order: order as any })
        : [];
    const medicalResultPages = medicalOrder
        ? await countMedicalResult(medicalOrder, { search: medicalResultSearch, take: take })
        : 0;

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
                            <Group gap={rem(4)}>
                                <CreateButton href='/omega/admin/patient/create' />
                                <ReloadButton />
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='patientSearch' value={patientSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <PatientEeqHeader />
                            <PatientEeqListBody action active={patient} patients={patients} />
                        </ListRoot>
                    </ModularBox>
                    {patientPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='patientPage'
                                page={patientPage}
                                total={patientPages} />
                        </ModularBox>)}
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
                                <Group gap={rem(4)}>
                                    {!!patient && <CreateButton href={`/omega/medical/order/create?patient=${patient}`} />}
                                    <ReloadButton />
                                    <RemoveQueryButton
                                        queries={['patient']}
                                        hiddenFrom='md' />
                                </Group>
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='medicalOrderSearch' value={medicalOrderSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <MedicalOrderHeader />
                            {patient ? <MedicalOrderListBody action active={medicalOrder} orders={medicalOrders} dni={patient} /> : <></>}
                        </ListRoot>
                    </ModularBox>
                    {medicalOrderPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='medicalOrderPage'
                                page={medicalOrderPage}
                                total={medicalOrderPages} />
                        </ModularBox>)}
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
                            <MedicalResultBody notEditReports medicalResult={medicalResults} order={medicalOrder} />
                        </ListRoot>
                    </ModularBox>
                    {medicalResultPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='medicalResultPage'
                                page={medicalResultPage}
                                total={medicalResultPages} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>
    )
}

export default OmegaAdminEeqPatientPage