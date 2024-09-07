import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import React, { Suspense } from 'react'
import PatientLayout from './_components/patient/patient-layout'
import MedicalOrderLayout from './_components/medical-order/medical-order-layout'
import MedicalResultLayout from './_components/medical-results/medical-result-layout'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Flex, rem, Title } from '@mantine/core'
import ReloadButton from '@/components/_base/reload-button'
import Search from '@/components/_base/search'
import ListRoot from '@/components/_base/list/list-root'
import PatientHeader from './_components/patient/patient-header'
import page from '@/app/page'
import Await from '@/components/_base/await'
import ListBodySuspense from '@/components/_base/list/list-body.suspense'
import search from '@/components/_base/search'
import ServerPagination from '@/components/_base/server-pagination'
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense'
import PatientListBody from './_components/patient/patient-list-body'
import { countPatient, searchPatient } from '@/server/patient.actions'
import { retriveMedicalOrder } from '@/server/medical-order.actions'

const take: number = 100;
interface PatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const PatientPage: React.FC<PatientPageProps> = ({ searchParams }) => {

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

    const patientPromise = searchPatient({ search: patientSearch, field: patientField, page: patientPage - 1, take: take, order: order as any });
    const patientPagePromise = countPatient({ search: patientSearch, take: take });

    const medicalOrderPromise = patient
        ? retriveMedicalOrder(type, { search: medicalOrderSearch, field: medicalOrderField, page: medicalOrderPage - 1, take: take, order: order as any })
        : new Promise<ExamSinglemedicalOrder[]>((resolve) => resolve([]));
    const medicalOrderPagePromise = type
        ? countExammedicalOrders(type, { search: examSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    return (
        <>
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
                                <Suspense fallback={<ListBodySuspense />}>
                                    <Await promise={patientPromise}>
                                        {(patients) => <PatientListBody active={patient} patients={patients} />}
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
                    <MedicalOrderLayout
                        medicalOrder={medicalOrder}
                        order={morderOrder}
                        patient={patient}
                        search={morderSearch} />
                </MultipleLayerSection>
                <MultipleLayerSection active={!!patient && !!medicalOrder}>
                    <MedicalResultLayout
                        medicalOrder={medicalOrder}
                        order={mresultOrder}
                        search={mresultSearch} />
                </MultipleLayerSection>
            </MultipleLayerRoot >
        </>
    )
}

export default PatientPage