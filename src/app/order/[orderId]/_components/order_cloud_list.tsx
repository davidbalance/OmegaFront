import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { MedicalCloudFile } from '@/server/medical_order/server_types'
import OrderCloudItem from './order_cloud_item'

interface OrderCloudFileProps {
    files: MedicalCloudFile[]
}
const OrderCloudFile: React.FC<OrderCloudFileProps> = ({
    files
}) => {
    return (
        <ListTbody height={{ base: 350, md: 450 }}>
            {files.map((e) => <>
                {e.resultHasFile && <OrderCloudItem key={`result_${e.testId}`} hasFile={e.resultHasFile} type='result' {...e} />}
                {e.reportHasContent && <OrderCloudItem key={`report_${e.testId}`} hasFile={e.reportHasContent} type='report' {...e} />}
            </>)}
        </ListTbody>
    )
}

export default OrderCloudFile