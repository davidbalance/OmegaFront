import React from 'react'
import ListTh from './_base/list/list-th'
import ListThead from './_base/list/list-thead'
import OrderableButton from './_base/orderable-button'
import { Text } from '@mantine/core'

const PatientHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='dni'>
                    <Text>Cedula</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='name'>
                    <Text>Nombre</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='lastname'>
                    <Text>Apellido</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>)
}

export default PatientHeader