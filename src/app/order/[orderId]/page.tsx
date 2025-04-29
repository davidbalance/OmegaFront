import { ButtonGroup, Flex, rem, Stack } from '@mantine/core'
import React from 'react'
import OrderPatientInfo from './_components/order-patient-info'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ListRoot from '@/components/_base/list/list-root'
import OrderCloudList from './_components/order-cloud-list'
import OrderDownloadAll from './_components/order-download-all'
import OrderCloudDownloadProvider from './_context/order-cloud-download.context'
import OrderDownloadSelected from './_components/order-download-selected'
import PlaceholderPanel from './_components/placeholder-panel'
import { retriveMedicalCloud } from '@/server'

interface OrderCloudPageProps {
    params: {
        orderId: string
    }
}
const OrderCloudPage: React.FC<OrderCloudPageProps> = async ({
    params
}) => {

    const data = await retriveMedicalCloud(params.orderId);

    if (!data.length) {
        return <>No hay datos encontrados</>
    }

    return (
        <Flex
            gap={rem(8)}
            h='100%'
            w='100%'
            wrap='nowrap'
            direction={{ base: 'column', md: 'row' }}>
            <Stack h={{ base: 'auto', md: '100%' }} gap={rem(8)}>
                <OrderPatientInfo {...data[0]} />
                <PlaceholderPanel />
            </Stack>
            <OrderCloudDownloadProvider>
                <Stack
                    w='100%'
                    h='100%'
                    gap={rem(8)}>
                    <ModularBox
                        h='100%'
                        py={rem(16)}>
                        <ListRoot>
                            <OrderCloudList files={data} />
                        </ListRoot>
                    </ModularBox>
                    <ModularBox>
                        <ButtonGroup>
                            <OrderDownloadAll files={data} />
                            <OrderDownloadSelected />
                        </ButtonGroup>
                    </ModularBox>
                </Stack>
            </OrderCloudDownloadProvider>
        </Flex>
    )
}

export default OrderCloudPage