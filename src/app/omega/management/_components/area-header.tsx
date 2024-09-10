import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'
import React from 'react'

const AreaHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='area'
                    field='name'>
                    <Text>Area</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default AreaHeader