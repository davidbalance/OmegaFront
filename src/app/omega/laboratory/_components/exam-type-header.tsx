import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'
import React from 'react'

const ExamTypeHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='type'
                    field='typeName'>
                    <Text>Tipo</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default ExamTypeHeader