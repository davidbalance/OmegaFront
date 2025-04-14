import React from 'react'
import { Text } from '@mantine/core'
import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'

const PatientEeqHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='patientDni'>
                    <Text>Cedula</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='patientName'>
                    <Text>Nombre</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='patientLastname'>
                    <Text>Apellido</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='patient'
                    field='patientRole'>
                    <Text>Rol</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>)
}

export default PatientEeqHeader