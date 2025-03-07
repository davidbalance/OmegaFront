import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import TableTh from '@/components/_base/table/table-th'
import TableTHead from '@/components/_base/table/table-thead'
import { TableTr, Text } from '@mantine/core'
import React from 'react'

const JobPositionHeader: React.FC = () => {
    return (
        <TableTHead>
            <TableTr>
                <TableTh>
                    <OrderableButton
                        field='jobPositionName'>
                        <Text>Puesto de trabajo</Text>
                    </OrderableButton>
                </TableTh>
            </TableTr>
        </TableTHead>
    )
}

export default JobPositionHeader