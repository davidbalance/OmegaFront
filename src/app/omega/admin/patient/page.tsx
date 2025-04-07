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
import { retriveClients } from '@/server/medical_client/actions'
import { retriveMedicalOrder, retriveMedicalOrders } from '@/server/medical_order/actions'
import { MedicalOrder } from '@/server/medical_order/server_types'
import { PaginationResponse } from '@/lib/types/pagination.type'
import { MedicalTest } from '@/server/medical_test/server_types'
import { retriveMedicalTests } from '@/server/medical_test/actions'
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

export default PatientPage