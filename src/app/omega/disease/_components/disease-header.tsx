import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button'
import { Text } from '@mantine/core'
import React from 'react'

const DiseaseHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='disease'
                    field='name'>
                    <Text>Morbilidad</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default DiseaseHeader