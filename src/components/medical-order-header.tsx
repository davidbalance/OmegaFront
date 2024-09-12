import React from 'react'
import ListTh from './_base/list/list-th'
import ListThead from './_base/list/list-thead'
import OrderableButton from './_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'

const MedicalOrderHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='process'>
                    <Text>Proceso</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='createAt'>
                    <Text>Fecha de creacion</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>)
}

export default MedicalOrderHeader