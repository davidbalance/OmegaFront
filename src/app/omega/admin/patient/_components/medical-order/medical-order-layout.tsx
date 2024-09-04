import Await from '@/components/_base/await';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import ListTh from '@/components/_base/list/list-th';
import ListThead from '@/components/_base/list/list-thead';
import OrderableButton from '@/components/_base/orderable-button';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Flex, rem, Box, Title, Group, Text } from '@mantine/core';
import React, { Suspense } from 'react'
import MedicalOrderListBody from './medical-order-list-body';
import { MedicalOrder } from '@/lib/dtos/medical/order/base.response.dto';
import { retriveMedicalOrder } from '../../../../../../server/medical-order.actions';
import { retriveEmail } from '../../../../../../server/medical-email.actions';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';

interface MedicalOrderLayoutProps {
    search?: string;
    order?: string;
    patient?: string;
    medicalOrder?: number;
}
const MedicalOrderLayout: React.FC<MedicalOrderLayoutProps> = ({
    medicalOrder,
    order,
    patient,
    search
}) => {

    const promise = new Promise<{ email: MedicalClientEmail[], orders: MedicalOrder[] }>(async (resolve) => {
        if (patient) {
            const email = await retriveEmail(patient);
            const orders = await retriveMedicalOrder(patient);
            resolve({ email, orders });
        }
        resolve({ email: [], orders: [] });
    })

    return (
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
                <Search queryKey='morderSearch' value={search} />
            </ModularBox>
            <ModularBox flex={1}>
                <ListRoot>
                    <ListThead>
                        <ListTh>
                            <OrderableButton queryKey='morderOrder' order={order} field='process'>
                                <Text>Proceso</Text>
                            </OrderableButton>
                        </ListTh>
                        <ListTh>
                            <OrderableButton queryKey='morderOrder' order={order} field='createAt'>
                                <Text>Fecha de creacion</Text>
                            </OrderableButton>
                        </ListTh>
                    </ListThead>
                    <Suspense fallback={<ListBodySuspense />}>
                        <Await promise={promise}>
                            {(props) =>
                                <MedicalOrderListBody
                                    active={medicalOrder}
                                    {...props} />}
                        </Await>
                    </Suspense>
                </ListRoot>
            </ModularBox>
        </ModularLayout>
    )
}

export default MedicalOrderLayout