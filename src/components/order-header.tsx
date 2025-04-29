import React from 'react'
import ListTh from './_base/list/list-th'
import ListThead from './_base/list/list-thead'
import OrderableButton from './_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'

const OrderHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='orderProcess'>
                    <Text>Proceso</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='orderEmissionDate'>
                    <Text>Fecha de creacion</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>)
}

export default OrderHeader