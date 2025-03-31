import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { OrderStatus } from '@/server/medical_order/server_types'
import { MedicalTest } from '@/server/medical_test/server_types'
import TestItem from './test_item'

interface TestListProps {
    tests: MedicalTest[];
    orderStatus: OrderStatus | undefined;
    notShowMisc?: boolean;
    notEditResults?: boolean;
    notEditReports?: boolean;
    showReportLabel?: boolean;
}
const TestList: React.FC<TestListProps> = ({
    tests,
    orderStatus,
    showReportLabel,
    ...props
}) => {
    return (
        <ListTbody>
            {tests.map(e => <TestItem
                key={e.testId}
                orderStatus={orderStatus}
                showReportLabel
                {...e}
                {...props} />)}
        </ListTbody>
    )
}

export default TestList