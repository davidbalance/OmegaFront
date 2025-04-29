import React from 'react'
import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Flex, rem, Group } from '@mantine/core';
import PatientEeqHeader from './_components/patient-eeq-header';
import Search from '@/components/_base/search';
import CreateButton from '@/components/_base/create-button';
import { retriveClientsEEQ } from '@/server';
import { PaginationResponse } from '@/lib/types/pagination.type';
import { MedicalOrder } from '@/server/medical-order/server-types';
import { retriveMedicalOrder, retriveMedicalOrdersEEQ } from '@/server';
import { MedicalTest } from '@/server/medical-test/server-types';
import { retriveMedicalTests } from '@/server';
import Title from '@/components/_base/mantine/title';
import PatientEeqList from './_components/patient-eeq-list';
import OrderList from '@/components/order-list';
import OrderHeader from '@/components/order-header';
import TestHeader from '@/components/test-header';
import TestList from '@/components/test-list';

const take: number = 100;
interface OmegaAdminEeqPatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaAdminEeqPatientPage: React.FC<OmegaAdminEeqPatientPageProps> = async ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;


    const patientActive = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;
    const patientSearch = typeof searchParams.patientSearch === 'string' ? searchParams.patientSearch : '';
    const patientField = owner === 'patient' ? field : undefined;
    const patientPage = typeof searchParams.patientPage === 'string' ? Number(searchParams.patientPage) : 1;

    const orderActive = typeof searchParams.medicalOrder === 'string' ? searchParams.medicalOrder : undefined;
    const orderSearch = typeof searchParams.medicalOrderSearch === 'string' ? searchParams.medicalOrderSearch : '';
    const orderField = owner === 'medicalOrder' ? field : undefined;
    const orderPage = typeof searchParams.medicalOrderPage === 'string' ? Number(searchParams.medicalOrderPage) : 1;

    const testSearch = typeof searchParams.medicalTestSearch === 'string' ? searchParams.medicalTestSearch : '';
    const testField = owner === 'medicalTest' ? field : undefined;

    const patientValue = await retriveClientsEEQ({
        filter: patientSearch,
        orderField: patientField as any,
        orderValue: orderingValue as any,
        skip: patientPage - 1,
        limit: take
    });
    const totalPatientPage = Math.floor(patientValue.amount / take);

    const orderValue: PaginationResponse<MedicalOrder> = patientActive
        ? await retriveMedicalOrdersEEQ({
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
                            <Group gap={rem(4)}>
                                <CreateButton href='/omega/admin/patient/create?eeq=true' />
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
                            <PatientEeqHeader />
                            <PatientEeqList
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
                            <Group gap={rem(4)}>
                                <Group gap={rem(4)}>
                                    {!!patientActive && <CreateButton href={`/omega/medical/order/create?patient=${patientActive}`} />}
                                    <ReloadButton />
                                    <RemoveQueryButton
                                        queries={['patient']}
                                        hiddenFrom='md' />
                                </Group>
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
                                action
                                checklist
                                remove
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

export default OmegaAdminEeqPatientPage