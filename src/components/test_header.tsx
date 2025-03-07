import React from 'react'
import ListTh from './_base/list/list-th'
import ListThead from './_base/list/list-thead'
import OrderableButton from './_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'

const TestHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='medicalTest'
                    field='examName'>
                    <Text>Examen medico</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default TestHeader