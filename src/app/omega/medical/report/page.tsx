import React from 'react'
import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import MedicalOrderHeader from '@/components/medical-order-header';
import MedicalResultBody from '@/components/medical-result-body';
import MedicalResultHeader from '@/components/medical-result-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import PatientHeader from '@/components/patient-header';
import PatientListBody from '@/components/patient-list-body';
import { countMedicalClientByDoctor, searchMedicalClientByDoctor } from '@/server/medical-client.actions';
import { countMedicalOrderByDoctor, searchMedicalOrderByDoctor } from '@/server/medical-order.actions';
import { countMedicalResultByDoctor, searchMedicalResultByDoctor } from '@/server/medical-result.actions';
import { Flex, rem, Box, Title, Group } from '@mantine/core';
import MedicalOrderListBody from './_components/medical-order-list-body';

const take: number = 100;
interface OmegaReportPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaReportPage: React.FC<OmegaReportPageProps> = async ({
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

    const patients = await searchMedicalClientByDoctor({ search: patientSearch, field: patientField, page: patientPage - 1, take: take, order: order as any });
    const patientPages = await countMedicalClientByDoctor({ search: patientSearch, take: take });

    const medicalOrders = patient
        ? await searchMedicalOrderByDoctor(patient, { search: medicalOrderSearch, field: medicalOrderField, page: medicalOrderPage - 1, take: take, order: order as any })
        : [];
    const medicalOrderPages = patient
        ? await countMedicalOrderByDoctor(patient, { search: medicalOrderSearch, take: take })
        : 0;

    const medicalResults = medicalOrder
        ? await searchMedicalResultByDoctor(medicalOrder, { search: medicalResultSearch, field: medicalResultField, page: medicalResultPage - 1, take: take, order: order as any })
        : [];
    const medicalResultPages = medicalOrder
        ? await countMedicalResultByDoctor(medicalOrder, { search: medicalResultSearch, take: take })
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
                            <ReloadButton />
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='patientSearch' value={patientSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <PatientHeader />
                            <PatientListBody active={patient} patients={patients} />
                        </ListRoot>
                    </ModularBox>
                    {patientPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='managementPage'
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
                            {patient ? <MedicalOrderListBody active={medicalOrder} orders={medicalOrders} /> : <></>}
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
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search query='medicalResultSearch' value={medicalResultSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <MedicalResultHeader />
                            <MedicalResultBody
                                notEditResults
                                notShowMisc
                                medicalResult={medicalResults}
                                order={medicalOrder} />
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
        </MultipleLayerRoot>)
}

export default OmegaReportPage