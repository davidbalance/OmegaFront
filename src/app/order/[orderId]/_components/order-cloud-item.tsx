import ListRow from '@/components/_base/list/list-row'
import { Box, Group, Text, Title } from '@mantine/core'
import React from 'react'
import OrderCloudCheck from './order-cloud-check'
import OrderDownloadSingle from './order-download-single'
import { MedicalCloudFile } from '@/server/medical-order/server-types'

const fileType: Record<string, string> = {
    'report': 'Reporte Medico',
    'result': 'Resultado Medico'
}

type OrderCloudItemProps = Pick<MedicalCloudFile, 'testId' | 'examName'> & {
    hasFile: boolean;
    type: 'report' | 'result'
};
const OrderCloudItem: React.FC<OrderCloudItemProps> = ({
    testId,
    examName,
    type,
    hasFile
}) => {
    return (
        <ListRow
            key={testId}
            hoverable>
            <Group wrap='nowrap'>
                <Box w='100%'>
                    <OrderCloudCheck testId={testId} examName={examName} fileType={type} hasFile={hasFile}>
                        <Title order={6}>{examName}</Title>
                        <Text>{fileType[type]}</Text>
                    </OrderCloudCheck>
                </Box>
                {hasFile ? (<OrderDownloadSingle
                    examName={examName}
                    testId={testId}
                    type={type} />) : null}
            </Group>
        </ListRow>
    )
}

export default OrderCloudItem