import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'
import React from 'react'


const MedicalOrderHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='patientName'>
                    <Text>Nombre</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='patientLastname'>
                    <Text>Apellido</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='patientDni'>
                    <Text>Cedula</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='medicalOrder'
                    field='orderProcess'>
                    <Text>Proceso</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>)
}

export default MedicalOrderHeader