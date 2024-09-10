import { Button, ButtonGroup, Group, rem, Stack } from '@mantine/core'
import React from 'react'
import HeadUp from './_components/head-up'
import { retriveCloud } from '@/server/medical-order.actions'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ListRoot from '@/components/_base/list/list-root'
import OrderCloudBody from './_components/order-cloud-body'
import { IconDownload, IconSelectAll } from '@tabler/icons-react'
import OrderDownloadAll from './_components/order-download-all'
import OrderCloudDownloadForm from './_components/order-cloud-download-form'
import OrderCloudDownloadProvider from './_components/order-cloud-download.context'
import OrderDownloadSelected from './_components/order-download-selected'

interface OrderCloudPageProps {
    params: { id: number }
}
const OrderCloudPage: React.FC<OrderCloudPageProps> = async ({
    params
}) => {

    const data = await retriveCloud(params.id);

    return (
        <Group
            gap={rem(8)}
            h='100%'
            w='100%'
            wrap='nowrap'>
            <Stack h='100%' gap={rem(8)}>
                <HeadUp {...data} />
                <ModularBox h='100%' />
            </Stack>
            <OrderCloudDownloadProvider>
                <OrderCloudDownloadForm>
                    <Stack
                        w='100%'
                        h='100%'
                        gap={rem(8)}>
                        <ModularBox
                            h='100%'
                            py={rem(16)}>
                            <ListRoot>
                                <OrderCloudBody files={[...data.fileResults, ...data.fileReports]} />
                            </ListRoot>
                        </ModularBox>
                        <ModularBox>
                            <ButtonGroup>
                                <OrderDownloadAll files={[...data.fileResults, ...data.fileReports]} />
                                <OrderDownloadSelected />
                            </ButtonGroup>
                        </ModularBox>
                    </Stack>
                </OrderCloudDownloadForm>
            </OrderCloudDownloadProvider>
        </Group>
    )
}

export default OrderCloudPage