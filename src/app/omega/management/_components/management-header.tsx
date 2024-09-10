import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'
import React from 'react'

const ManagementHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='management'
                    field='name'>
                    <Text>Gerencia</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default ManagementHeader