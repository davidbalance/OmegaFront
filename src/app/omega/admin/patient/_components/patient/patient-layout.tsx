import Await from '@/components/_base/await';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import ListTh from '@/components/_base/list/list-th';
import ListThead from '@/components/_base/list/list-thead';
import OrderableButton from '@/components/_base/orderable-button';
import React, { Suspense } from 'react'
import { Box, Flex, rem, Text, Title } from '@mantine/core';
import { retrivePatients, patientPages } from '../../_actions/patient.actions';
import ReloadButton from '@/components/_base/reload-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import PatientListBody from './patient-list-body';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';

interface PatientLayoutProps {
    page: number;
    patient?: string;
    search?: string;
    order?: string;
}
const PatientLayout: React.FC<PatientLayoutProps> = ({
    page,
    search,
    patient,
    order
}) => {

    const patientPromise = retrivePatients({
        limit: 100, page: page, filter: search, order: order ? {
            key: order.split('-')[0] as any,
            order: order.split('-')[1].toUpperCase() as any,
        } : undefined
    });
    const patientPagePromise = patientPages({
        limit: 100, page: page, filter: search, order: order ? {
            key: order.split('-')[0] as any,
            order: order.split('-')[1].toUpperCase() as any,
        } : undefined
    });

    return (
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
                <Search queryKey='patientSearch' value={search} />
            </ModularBox>
            <ModularBox flex={1}>
                <ListRoot>
                    <ListThead>
                        <ListTh>
                            <OrderableButton queryKey='patientOrder' order={order} field='dni'>
                                <Text>Cedula</Text>
                            </OrderableButton>
                        </ListTh>
                        <ListTh>
                            <OrderableButton queryKey='patientOrder' order={order} field='name'>
                                <Text>Nombre</Text>
                            </OrderableButton>
                        </ListTh>
                        <ListTh>
                            <OrderableButton queryKey='patientOrder' order={order} field='lastname'>
                                <Text>Apellido</Text>
                            </OrderableButton>
                        </ListTh>
                    </ListThead>
                    <Suspense fallback={<ListBodySuspense />}>
                        <Await promise={patientPromise}>
                            {(patients) => <PatientListBody active={patient} patients={patients} />}
                        </Await>
                    </Suspense>
                </ListRoot>
            </ModularBox>
            <ModularBox>
                <Suspense fallback={<ServerPaginationSuspense />}>
                    <Await promise={patientPagePromise}>
                        {(pages) => (
                            <ServerPagination
                                queryKey='patientPage'
                                page={page}
                                total={pages} />
                        )}
                    </Await>
                </Suspense>

            </ModularBox>
        </ModularLayout>
    )
}

export default PatientLayout