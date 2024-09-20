import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalOrderCloudFile } from '@/lib/dtos/medical/order/base.response.dto'
import { Group, Text, Title } from '@mantine/core'
import React from 'react'
import OrderCloudCheckProvider from './order-cloud-check.context'
import OrderCloudButton from './order-cloud-button'
import OrderCloudCheck from './order-cloud-check'
import OrderDownloadSingle from './order-download-single'

const fileType: Record<string, string> = {
    'report': 'Reporte Medico',
    'result': 'Resultado Medico',
    'order': 'Orden Medica'
}

interface OrderCloudBodyProps {
    files: MedicalOrderCloudFile[]
}
const OrderCloudBody: React.FC<OrderCloudBodyProps> = ({
    files
}) => {
    return (
        <ListTbody height={{ base: 350, md: 450 }}>
            {files.map((e) => (
                <ListRow
                    key={e.id.toString()}
                    hoverable>
                    <OrderCloudCheckProvider {...e}>
                        <Group wrap='nowrap'>
                            {e.hasFile ? <OrderCloudCheck /> : null}
                            <OrderCloudButton>
                                <Title order={6}>{e.examName}</Title>
                                <Text>{fileType[e.type]}</Text>
                            </OrderCloudButton>
                            {e.hasFile ? (<OrderDownloadSingle {...e} />) : null}
                        </Group>
                    </OrderCloudCheckProvider>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default OrderCloudBody