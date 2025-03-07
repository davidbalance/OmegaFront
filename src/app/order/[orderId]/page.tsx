import { ButtonGroup, Flex, rem, Stack } from '@mantine/core'
import React from 'react'
import OrderPatientInfo from './_components/order_patient_info'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ListRoot from '@/components/_base/list/list-root'
import OrderCloudList from './_components/order_cloud_list'
import OrderDownloadAll from './_components/order_download_all'
import OrderCloudDownloadProvider from './_context/order_cloud_download.context'
import OrderDownloadSelected from './_components/order_download_selected'
import PlaceholderPanel from './_components/placeholder_panel'
import { retriveMedicalCloud } from '@/server/medical_order/actions'

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