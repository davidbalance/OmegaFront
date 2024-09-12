import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import { Text } from '@mantine/core'
import React from 'react'

const OrderCloudHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <Text>Nombre del archivo</Text>
            </ListTh>
            <ListTh>
                <Text>Tipo del archivo</Text>
            </ListTh>
        </ListThead>
    )
}

export default OrderCloudHeader