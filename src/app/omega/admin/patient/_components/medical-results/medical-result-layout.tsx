import Await from '@/components/_base/await'
import ListBodySuspense from '@/components/_base/list/list-body.suspense'
import ListRoot from '@/components/_base/list/list-root'
import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button'
import ReloadButton from '@/components/_base/reload-button'
import Search from '@/components/_base/search'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Flex, rem, Box, Title, Text } from '@mantine/core'
import React, { Suspense } from 'react'
import MedicalResultListBody from './medical-result-list-body'
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto'
import { retriveMedicalResultsByOrder } from '../../../../../../server/medical-result.action'

interface MedicalResultLayoutProps {
    search?: string;
    order?: string;
    medicalOrder?: number;
}
const MedicalResultLayout: React.FC<MedicalResultLayoutProps> = ({
    medicalOrder,
    order,
    search
}) => {

    const medicalResultPromise = medicalOrder ? retriveMedicalResultsByOrder(medicalOrder) : new Promise<MedicalResult[]>((resolve) => resolve([]));

    return (
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
                <Search queryKey='mresultSearch' value={search} />
            </ModularBox>
            <ModularBox flex={1}>
                <ListRoot>
                    <ListThead>
                        <ListTh>
                            <OrderableButton queryKey='mresultOrder' order={order} field='examName'>
                                <Text>Examen medico</Text>
                            </OrderableButton>
                        </ListTh>
                    </ListThead>
                    <Suspense fallback={<ListBodySuspense />}>
                        <Await promise={medicalResultPromise}>
                            {(data) => <MedicalResultListBody data={data} />}
                        </Await>
                    </Suspense>
                </ListRoot>
            </ModularBox>
        </ModularLayout>
    )
}

export default MedicalResultLayout