import React from 'react'
import ListTh from './_base/list/list-th'
import ListThead from './_base/list/list-thead'
import OrderableButton from './_base/orderable-button'
import { Text } from '@mantine/core'

const MedicalResultHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton owner='medicalResult' field='examName'>
                    <Text>Examen medico</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default MedicalResultHeader